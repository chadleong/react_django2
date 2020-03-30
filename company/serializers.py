from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User serializer


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'email')


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'email', 'password')
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		user = User(
			email=validated_data['email'],
		)
		user.set_password(validated_data['password'])
		user.save()
		return user
# Login serializer


class LoginSerializer(serializers.Serializer):
	email = serializers.CharField()
	password = serializers.CharField()

	def validate(self, data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		raise serializers.ValidationError("Incorrect credentials")
