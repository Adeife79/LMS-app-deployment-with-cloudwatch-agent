# Containerization of Learning Management System (LMS)
A containerized Learning Management System built with **React, Django REST Framework, and PostgreSQL**. The application is containerized and managed using **Docker and Docker Compose**.

---

## Technologies Used
- PostgreSQL
- Docker
- Docker Compose

---

## 📁 Project Structure
```text
LMS-Learning-Management-System-Containerization
├── lms-backend/
│   ├── core/
│   ├── lms-backend/
│   ├── users/
│   ├── .dockerignore
│   ├── manage.py
│   ├── requirements.txt
│   └──  Dockerfile
│   
├── lms-frontend
│   ├── public/
│   ├── src/
│   ├── .dockerignore
│   ├──.gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js
│   └── Dockerfile 
│
├── docker-compose.yml
└── README.md
```

# 🚀 Project Setup and Installation
## Prerequisites
Before running the project, I checked if the following are installed using the command:
```bash
git --version
docker --version
docker compose version
```

Below are the steps I took to set up this project
Step 1: Clone the Repository
I cloned the application repository and navigated to the project repository:
```bash
git clone 
cd LMS-Learning-Management-System-Containerization
```

Step 2: Virtual Environment Activation
I Installed a virtual environment for backend in the lms-backend directory and activated it using the command:
```bash
cd lms-backend
python -m venv env
source env/bin/activate
```

Step 3: Installation of Django REST Framework, Django Cors-headers, and Rest-Framework-Simplejwt in Virtual Environment.
```bash
pip install django djangorestframework
pip install django-cors-headers
pip install djangorestframework-simplejwt
```

# How to Build and Run the Container
Step 1: Docker Setup
1. Navigated to the lms-frontend directory to create Dockerfile.
```bash
cd lms-backend
touch Dockerfile
```
2. Created repositories for both the lms-backend and lms-frontend on DockerHub. 
I logged in to DockerHub from terminal:
```bash
docker login
```

3. Built the frontend Docker image, tag, and push it to DockerHub.
```bash
docker build -t lms-frontend:v1 .
docker tag lms-frontend:v1 adeife08/lms-frontend:v1
docker push adeife08/lms-frontend:v1
```

4. Navigated to the lms-backend directory to create Dockerfile.
```bash
cd lms-frontend
touch Dockerfile
```

5. Built the backend Docker image, tag, and push it to DockerHub.
```bash
docker build -t lms-backend:v2 .
docker tag lms-backend:v2 adeife08/lms-backend:v1
docker push adeife08/lms-backend:v2
```

6. Navigated back to the project directory and created `docker-compose.yml` file:
```bash
cd LMS-Learning-Management-System-Containerization
touch docker-compose.yml
```

7. Ran the docker compose file:
```bash
docker compose up -d
```

8. Checked docker images (frontend, backend, postgresql):
```bash
docker ps 
```

9. Checked frontend content in terminal:
```bash
curl http://127.0.0.1:5173
```

10. Navigated to the backend shell to make migrations and update user table to use Postgresql database:
```bash
docker exec -it lms-backend-container /bin/bash
python manage.py migrate
exit
```

11. Accessed the frontend application using the url:
```
http://127.0.0.1:5173
```








