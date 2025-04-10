# Full-Stack To-Do List Application

A simple full-stack web application to manage tasks (CRUD Operations) built with Angular 19 (frontend), Node.js with Express (backend), and MongoDB.

## Tech Stack

- **Frontend:** Angular 19 + Tailwind CSS
- **Backend:** Node.js (Express)
- **Database:** MongoDB

## Features

- Task list display
- Add task (modal form)
- Edit task (reuses the same modal form)
- Delete task with confirmation modal
- RESTful API
- Modular architecture (frontend/backend separation)

## How to Run Locally

### Backend

```bash
cd backend
npm install
npm run start
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

## API Endpoints

- `code GET /tasks`— Get all tasks
- `code POST /tasks` — Create a new task
- `code PUT /tasks/:id` — Update a task
- `code DELETE /tasks/:id` — Delete a task
