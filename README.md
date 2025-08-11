# Zelebober

**Zelebober** is a web-based messenger designed for fast, secure, and seamless communication — all accessible directly from your browser.  
Built with **Django** for the backend and **React (Vite)** for the frontend, it delivers real-time messaging with a clean, responsive interface.

---

## Features
-  **Fast browser-based messaging** — no downloads required  
-  **Secure backend** powered by Django & DRF  
-  **Modern frontend** built with React & Vite  
-  **Responsive design** for desktop and mobile  
-  **Easy deployment** with clear separation of backend & frontend

---

## Tech Stack
**Backend:** Django, Django REST Framework  
**Frontend:** React, Vite, Tailwind CSS (optional)  
**Database:** SQLite (dev) / PostgreSQL (prod)  

---

## Getting Started

## Backend (Django)
1) Create & Activate Virtual Environment
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```
2) Install Dependencies
 ```bash
pip install -r requirements.txt
```
3) Apply Migrations
```bash
python manage.py migrate
```
4) Create Superuser (optional, for admin panel)
```bash
python manage.py createsuperuser
```
5) Run the Backend Server
```bash
python manage.py runserver
```
By default, it runs at http://127.0.0.1:8000/

Frontend (React + Vite)
1) Install Frontend Dependencies
```bash
cd ../frontend
npm install
```
3) Run Development Server
```bash
npm run dev
```
By default, it runs at http://localhost:5173/
