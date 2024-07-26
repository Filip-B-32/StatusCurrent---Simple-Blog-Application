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