import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Chat, ChatMessage
from .serializers import ChatMessageSerializer

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_id = int(self.scope['url_route']['kwargs']['pk'])
        self.room_group_name = f'chat_{self.room_id}'
        self.user = self.scope['user']
        
        if not self.user.is_authenticated:
            await self.close(code=4004)
            return

        is_member = await self.user_in_chat(self.room_id, self.user)
        if not is_member:
            await self.close(code=4004)
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept(subprotocol=self.scope["subprotocols"][0])

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data, bytes_data=None):
        try:
            if not text_data:
                raise ValueError("JSON data missing")
            
            data = json.loads(text_data)
            message = data.get('message', '')
            
            if not message:
                raise ValueError("Message is empty or missing")
            
            if not isinstance(message, str):
                raise ValueError("Message must be a string")

            message_text = message.strip()

            if not message_text:
                raise ValueError("Message is empty")

            chat_message = await self.create_chat_message(
                self.room_id, self.user.id, message_text)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': chat_message
                }
            )
        except json.JSONDecodeError:
            await self.send_json_error("Invalid JSON", code=400)
        except ValueError as e:
            await self.send_json_error(str(e), code=400)
        except Exception as e:
            await self.send_json_error("Server error", code=500)

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event['message'], ensure_ascii=False))

    async def send_json_error(self, error_message, code):
        await self.send(text_data=json.dumps({
            "error": error_message,
            "code": code
        }, ensure_ascii=False))

    @database_sync_to_async
    def user_in_chat(self, chat_id, user):
        try:
            chat = Chat.objects.get(id=chat_id)
            return chat.members.filter(id=user.id).exists()
        except Chat.DoesNotExist:
            return False

    
    @database_sync_to_async
    def create_chat_message(self, chat_id, user_id, text):
        data = {
            "chat": chat_id,
            "author": user_id,
            "text": text
        }
        serializer = ChatMessageSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save()
        return ChatMessageSerializer(message).data