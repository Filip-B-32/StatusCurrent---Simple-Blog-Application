from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework import status

from StatusCurrentApp.models import BlogPost
from StatusCurrentApp.serializers import BlogPostSerializer

class BlogPostListCreateView(mixins.ListModelMixin,
                             mixins.CreateModelMixin,
                             generics.GenericAPIView):
    
    #handle listing and creating new blog post
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class BlogPostDetailView(mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         generics.GenericAPIView):
    
    #handle retrieving, updating, deleting specific blog post
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)