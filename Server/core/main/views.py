from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
from .models import Room, Player
from .serializers import RoomModelSerializer

class RoomView(APIView):

    def get(self, request):
        room_id = request.GET["room_id"]
        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response("Room not found")
        response = RoomModelSerializer(room)
        return Response(response)


    def post(self, request):
        room_name = request.data.get("room_name")
        player_name = request.data.get("player_name")
        player = Player.objects.create(name=player_name)
        room = Room.objects.create(name=room_name)
        room.player.add(player)
        room.save()
        response = RoomModelSerializer(room).data
        return Response(response)

class JoinRoomView(APIView):
    # join a room with room_id
    def post(self, request):
        room_id = request.data["room_id"]
        player_name = request.data["player_name"]

        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response({"data": "Room not found"})
        player = Player.objects.create(name=player_name)
        room.player.add(player)
        room.save()
        response = RoomModelSerializer(room).data
        return Response(response)


