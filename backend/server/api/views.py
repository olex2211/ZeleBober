from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = response.data.get('refresh')
        if refresh:
            response.set_cookie(key='refresh', value=refresh, httponly=True, samesite='None',)# httponly=True, samesite='None', secure=True,
        response.data.pop('refresh', None)
        return response


class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        # print(refresh_token)
        request.data.update({'refresh': refresh_token})
        return super().post(request, *args, **kwargs)


# class LogoutView(APIView):
#     def post(self, request):
#         response = Response({'detail': 'Logged out'}, status=200)
#         response.delete_cookie('refresh_token')
#         return response
