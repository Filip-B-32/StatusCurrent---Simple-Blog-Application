# StatusCurrent---Simple-Blog-Application

1. Project Name: StatusCurrent

2. Description: StatusCurrent is a simple blog application which will allow users to create, read, update, and delete blog posts.

3. Key Features: The user can see the list of blog posts, can edit the posts, delete the posts and even create a new post.

4. Tech Stack: React.js (frontend), Django Rest Framework (backend), PostgreSQL (database)

This project uses docker for packaging the application with all the dependencies into a standardized unit. In case of cloning and using on the local maching do the followings:

1. For the BACKEND:
    - make sure that python and pgadmin is installed on the local machine (python 3.12.4)
    - install the following modules:
        - django
        - djangorestframework
        - django-cors-headers (managing the request coming from different domains)
        - psycopg2 (database adapror)
    - create your database for the app using PostgreSQL
    - add details in the settings.py (NAME, USER, PASSWORD, HOST, PORT)
    - make the migrations
    - run backend using "python manage.py runserver"

2. For the FRONTEND:
    - make sure node is installed on the local machine (node 14.17.3)
    - run "npm install" to install the dependencies
    - this application uses AXIOS for making the HTTP requests. In axiosConfig/axiosInstance.js set the base URL (host:port)
    - run frontend by using "npm start"

Project results:
BlogPage:
![image](https://github.com/user-attachments/assets/da44b8f7-da87-4c9f-9dfb-1e68a8ad8c3e)

CreateModal:
![image](https://github.com/user-attachments/assets/df2fc560-db54-4f67-8131-2eccce52883f)

EditModal:
![image](https://github.com/user-attachments/assets/fa4cc1e9-7673-48a7-88f0-3b711741aa15)


This applications uses docker-compose to simplify the proccess of defining and running multicontainer (frontend, backend, db). To utilize the docker-compose run the following command: "docker-compose up --build".

Improvements:
In the "Given more time" case, this application will have a secure authentification functionality and also a comment section for the blog post, therefore will add a details page to fetch the comments by blog post to not fetch all the comments, just what we need.

Every password is a mock, no sensitive data was leaked.
