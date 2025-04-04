from user_app.serializers import User, UserSerializer # importing needed models/serializers
from rest_framework.views import Response, APIView # importing needed Response and APIView classes
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status as s

# Create your views here.
class All_users(APIView):
  def get(self, request):
    # grabbing all users from db
    all_users = UserSerializer(User.objects.all(), many=True)
    return Response(all_users.data, status=s.HTTP_200_OK)
  
  def post(self, request):
    # setting variable = to data in the POST request
    new_user = UserSerializer(data=request.data)
    if new_user.is_valid(): # checking if that data is valid
      new_user.save() # if it is, save it to db
      return Response(new_user.data, status=s.HTTP_201_CREATED)    
    return Response(new_user.errors, status=s.HTTP_400_BAD_REQUEST)
  
  def delete(self, request, username):
    # grabs the correct user object by username or returns a 404 status if that username is not found
    user_to_delete = get_object_or_404(User, username=username) 
    user_to_delete.delete() # deletes that user username
    return Response({"Message": "User has been successfully deleted!"}, status=s.HTTP_204_NO_CONTENT)

  def put(self, request, username):
    # gets the user object we want to update
    user_to_update = get_object_or_404(User, username=username)
  # serialize that user object 
    serialized_user = UserSerializer(user_to_update, data=request.data, partial=True)
    print(serialized_user)
  # check the validity of that serialization
    if serialized_user.is_valid():
      # if updating the password, we need to hash it
      password = request.data.get("password", None)
      if password:
        user_to_update.set_password(password) # hash the password
      serialized_user.save() # if valid, save and return it
      return Response({"Message": "User has been successfully updated!"}, status=s.HTTP_200_OK)
    # if not valid, display errors and set status 
    return Response(serialized_user.errors, status=s.HTTP_400_BAD_REQUEST)
  