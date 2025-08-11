from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TokenView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = response.data.get('refresh')
        if refresh:
            response.set_cookie(key='refresh', value=refresh, httponly=True) # samesite='None', secure=True,
        response.data.pop('refresh', None)
        return response


class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        request.data.update({'refresh': refresh_token})
        return super().post(request, *args, **kwargs)


class BlacklistTokenView(TokenBlacklistView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        request.data.update({'refresh': refresh_token})
        response = super().post(request, *args, **kwargs)
        response.delete_cookie('refresh')
        return response