# Full-Stack To-Do List Application

A simple full-stack web application to manage tasks (CRUD Operations) built with Angular 19 (frontend), Node.js with Express (backend), and MongoDB.

## Tech Stack

- **Frontend:** Angular 19 + Tailwind CSS
- **Backend:** Node.js (Express)
- **Database:** MongoDB

## Features

- Register and login to user account
- Task list display
- Add task (modal form)
- Edit task (reuses the same modal form)
- Delete task with confirmation modal
- RESTful API with secure routes & authentication
- Modular architecture (frontend/backend separation)

## How to Run Locally

### Backend

```bash
cd backend
scp .env.example .env // edit with your datas

npm install
npm run start
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Visit: http://localhost:4200

## API Endpoints

### Tasks endpoints

- `GET /api/tasks`— Get all tasks
- `POST /api/tasks` — Create a new task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task

### Auth Endpoints

- `POST /api/auth/register`— Register User
- `POST /api/auth/login` — Log user in
- `GET /api/auth/me` — Get logged user infos
