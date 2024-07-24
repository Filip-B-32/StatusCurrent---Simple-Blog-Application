from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework import status

from StatusCurrentApp.models import BlogPost
from StatusCurrentApp.serializers import BlogPostSerializer

class BlogPostListCreateView(mixins.ListModelMixin,
                             mixins.CreateModelMixin,
                             generics.GenericAPIView):
    
    # handle listing and creating new blog posts
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        response = self.create(request, *args, **kwargs)
        return Response({"message": "Blog post created successfully!", "data": response.data}, status=status.HTTP_201_CREATED)

class BlogPostDetailView(mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         generics.GenericAPIView):
    
    # handle retrieving, updating, deleting specific blog posts
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def get(self, request, *args, **kwargs):
        try:
            return self.retrieve(request, *args, **kwargs)
        except BlogPost.DoesNotExist:
            return Response({"message": "Blog post not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        response = self.update(request, *args, **kwargs)
        return Response({"message": "Blog post updated successfully", "data": response.data}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        self.destroy(request, *args, **kwargs)
        return Response({"message": "Blog post deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)