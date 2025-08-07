from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import login, logout, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from playlist_app.models import Playlist
from rest_framework import status as s
from .models import User
from .serializers import UserInfoSerializer, UserSignupSerializer
from django.shortcuts import get_object_or_404
import logging
from django.db import IntegrityError


# TokenReq class enforces a user be logged in to access certain pages/app functions
class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


logger = logging.getLogger(__name__)


class User_Info(TokenReq):
    def get(self, request):
        try:
            current_user = request.user
            logger.debug(f"Current user: {current_user}")
            if current_user.is_anonymous:
                return Response(
                    {"error": "User is not authenticated"},
                    status=s.HTTP_401_UNAUTHORIZED,
                )
            user_ser = UserInfoSerializer(current_user)
            logger.debug(f"Serialized data: {user_ser.data}")
            return Response(user_ser.data, status=s.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error in User_Info view: {str(e)}")
            return Response({"error": str(e)}, status=s.HTTP_400_BAD_REQUEST)

    def put(self, request):
        data = request.data.copy()
        # pass the request's data into the serializer
        serialized = UserInfoSerializer(request.user, data=data, partial=True)
        if serialized.is_valid():
            serialized.save()  # if the data is valid, save it to the db
            return Response(
                {"message": "Info was successfully updated!"}, status=s.HTTP_200_OK
            )
        return Response(serialized.errors, status=s.HTTP_400_BAD_REQUEST)


class Sign_Up(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = data.get("username", None)  

        serialized_user = UserSignupSerializer(data=data)

        if serialized_user.is_valid():
            try:
                new_user = serialized_user.save()
                token = Token.objects.create(user=new_user)
                Playlist.objects.create(name="Liked Songs", user=new_user)

                return Response(
                    {"message": "Account successfully created!", "token": token.key},
                    status=s.HTTP_201_CREATED,
                )
            except IntegrityError:
                return Response(
                    {"error": "A user with this username or email already exists."},
                    status=s.HTTP_400_BAD_REQUEST,
                )
            except Exception as e:
                return Response(
                    {"error": str(e)}, status=s.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(serialized_user.errors, status=s.HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request):
        data = request.data.copy()

        # setting their username to the email if they haven't entered a username
        data["username"] = request.data.get("username", request.data.get("email"))

        # valid field are not empty
        if not data.get("username") or not data.get("password"):
            return Response(
                {"error": "Username/email and password are required."},
                status=s.HTTP_400_BAD_REQUEST,
            )


        if "@" not in data.get("username"):
            try:
                user_obj = get_object_or_404(User, username = data.get("username"))
                data["username"] = user_obj.email
            except User.DoesNotExist:
                pass
        # authenticate their provided username/password with their registered username/password
        current_user = authenticate(username=data.get("username"), password=data.get("password"))

        if current_user:
            login(request, current_user)  # log them in
            # get their token credentials or create one for them
            token, create = Token.objects.get_or_create(user=current_user)
            return Response({"token": token.key}, status=s.HTTP_200_OK)

        return Response(
            {"error": "Username or password incorrect"}, status=s.HTTP_400_BAD_REQUEST
        )
        # don't specify which is incorrect because that would narrow it down for a malicious party


class Logout(TokenReq):
    def post(self, request):
        try:
            # ensures that the user is forced to re-athenticate next time
            request.user.auth_token.delete()
            logout(request)
            return Response(
                {"message": "user has been logged out"}, status=s.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": "There was an issue logging you out"},
                status=s.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DeleteAccount(TokenReq):  # Assumes TokenReq enforces authentication
    def delete(self, request):
        try:
            request.user.delete()
            return Response(
                {"message": "Account successfully deleted."},
                status=s.HTTP_204_NO_CONTENT,
            )
        except Exception:
            return Response(
                {
                    "error": "There was an issue deleting your account. Please try again."
                },
                status=s.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TokenVerification(TokenReq):
    def get(self, request):
        current_token = request.headers.get("Authorization").split(" ")[1]
        token = get_object_or_404(Token, key=current_token)
        user = token.user
        return Response(status=s.HTTP_200_OK)
