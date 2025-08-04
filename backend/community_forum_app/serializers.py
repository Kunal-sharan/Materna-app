from rest_framework import serializers
from .models import Post, Reply

class ReplySerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'content', 'author_username', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'tags', 'author_username', 'likes_count', 'replies', 'created_at']

    def get_likes_count(self, obj):
        return obj.likes.count()
