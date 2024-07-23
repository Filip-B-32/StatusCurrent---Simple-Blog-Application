from django.db import models

# Create your models here.
class BlogPost(models.Model):
    BlogPostId = models.AutoField(primary_key = True)
    Title = models.CharField(max_length = 100)
    Content = models.TextField()
    Author = models.CharField(max_length = 100)
    Created_at = models.DateTimeField(auto_now_add=True) # sets field to current date and time when first created
    Updated_at = models.DateTimeField(auto_now=True) # sets the field to current date and time every time the object is saved

class Meta:
    ordering = ['-Created_at', '-Updated_at']  # Orders by Created_at first, then Updated_at in descending order