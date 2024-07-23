from rest_framework import serializers
from StatusCurrentApp.models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
         model = BlogPost  # Specifies the model to be serialized
         fields = ['BlogPostId', 'Title', 'Content', 'Author', 'Created_at', 'Updated_at']  # Fields to include in the serialization