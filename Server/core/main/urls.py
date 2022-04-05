from django.contrib import admin
from django.urls import path, include
from .views import RoomView, JoinRoomView

urlpatterns = [
    path("startRoom/", RoomView.as_view(), name="startRoom"),
    path("joinRoom/", JoinRoomView.as_view(), name="joinRoom")
]