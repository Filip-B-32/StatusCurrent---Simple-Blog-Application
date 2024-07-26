# Use the official Python image from the Docker Hub
FROM python:3.12.4

# Set environment variables to prevent Python from writing .pyc files to disc
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /StatusCurrentAPI/

# Copy the project files into the container
COPY . /StatusCurrentAPI/

# Install Python dependencies
RUN pip install django djangorestframework django-cors-headers psycopg2

# Command to run the application
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
