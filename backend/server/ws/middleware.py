from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model

User = get_user_model()

class JWTAuthMiddleware(BaseMiddleware):
    async def resolve_scope(self, scope):
        auth_header = None
        subprotocols = scope.get("subprotocols", [])
        if len(subprotocols) >= 2 and subprotocols[0].lower() == "bearer":
            auth_header = f"{subprotocols[0]} {subprotocols[1]}"
        scope['user'] = await self.get_user_from_header(auth_header)
        return scope

    @database_sync_to_async
    def get_user_from_header(self, auth_header):
        if not auth_header:
            return AnonymousUser()
        
        if auth_header.startswith('Bearer ') or auth_header.startswith('bearer '):
            token = auth_header.split(' ')[1]
            try:
                access_token = AccessToken(token)
                return User.objects.get(id=access_token['user_id'])
            except Exception:
                return AnonymousUser()
        return AnonymousUser()
    
    async def __call__(self, scope, receive, send):
        await self.resolve_scope(scope)
        return await super().__call__(scope, receive, send)