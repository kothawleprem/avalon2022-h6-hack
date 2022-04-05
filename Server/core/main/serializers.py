from rest_framework.serializers import Serializer, ModelSerializer
from .models import Room
class RoomModelSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'player']