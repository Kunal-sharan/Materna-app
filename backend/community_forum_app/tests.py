from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Post, Reply

User = get_user_model()  # 👈 This now correctly references CustomUserProfile


class CommunityForumAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='rahul', password='testpass123')
        self.client = APIClient()
        self.client.login(username='rahul', password='testpass123')

        self.post = Post.objects.create(
            title="First Post",
            content="This is the content",
            tags="test,first",
            author=self.user
        )

    def test_list_posts(self):
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "First Post")

    def test_create_post(self):
        payload = {
            "title": "New Post",
            "content": "Some great content",
            "tags": "fun,api"
        }
        response = self.client.post('/posts/', payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)
        self.assertEqual(Post.objects.last().title, "New Post")

    def test_add_reply(self):
        payload = {
            "content": "Nice post!"
        }
        url = f'/posts/{self.post.id}/reply/'
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.post.replies.count(), 1)
        self.assertEqual(self.post.replies.first().content, "Nice post!")

    def test_like_and_unlike_post(self):
        url = f'/posts/{self.post.id}/like/'

        # Like
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.post.likes.count(), 1)

        # Unlike (toggle)
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.post.likes.count(), 0)
