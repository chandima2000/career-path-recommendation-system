from rest_framework import serializers
from .models import UserModel



class PredictionSerializer(serializers.Serializer):
    question1 = serializers.CharField(max_length=100)
    question2 = serializers.CharField(max_length=100)
    question3 = serializers.CharField(max_length=100)
    question4 = serializers.CharField(max_length=100)
    question5 = serializers.CharField(max_length=100)
    question6 = serializers.CharField(max_length=100)
    question7 = serializers.CharField(max_length=100)
    question8 = serializers.CharField(max_length=100)
    question9 = serializers.CharField(max_length=100)
    question10 = serializers.CharField(max_length=100)
    question11 = serializers.CharField(max_length=100)
    question12 = serializers.CharField(max_length=100)
    question13 = serializers.CharField(max_length=100)
    question14 = serializers.CharField(max_length=100)
    question15 = serializers.CharField(max_length=100)
    question16 = serializers.CharField(max_length=100)
    question17 = serializers.CharField(max_length=100)
    question18 = serializers.CharField(max_length=100)
    question19 = serializers.CharField(max_length=100)



class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        # fields = ["name","age","email","password"]
        fields = '__all__'



class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.Serializer):
    class Meta:
        model = UserModel
        name = serializers.CharField(read_only=True)