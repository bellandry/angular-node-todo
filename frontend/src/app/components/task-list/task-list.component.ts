import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { Task, TaskService } from '../../services/task.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, ConfirmationModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  currentUser: User | null = null;

  showModal: boolean = false;
  editingTask: any = null;

  title: string = '';
  description: string = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.authService.getUserInfo().subscribe({
        next: (user) => {
          this.currentUser = user;
        },
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  onTaskSaved() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  deleteTask(id: string | undefined) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  openModal() {
    this.showModal = true;
    this.title = '';
    this.description = '';
    this.editingTask = null;
  }

  closeModal() {
    this.showModal = false;
  }

  editTask(task: Task) {
    this.title = task.title;
    this.description = task.description;
    this.editingTask = task;
    this.showModal = true;
  }

  submitTask() {
    if (this.editingTask) {
      const updatedTask = {
        ...this.editingTask,
        title: this.title,
        description: this.description,
      };
      this.taskService
        .updateTask(this.editingTask.id, updatedTask)
        .subscribe(() => {
          this.loadTasks();
          this.closeModal();
        });
    } else {
      const newTask = {
        title: this.title,
        description: this.description,
      };
      this.taskService.createTask(newTask).subscribe(() => {
        this.loadTasks();
        this.closeModal();
      });
    }
  }

  showDeleteModal = false;
  taskToDelete: string | undefined;

  openDeleteModal(taskId: string) {
    this.taskToDelete = taskId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete).subscribe(() => {
        this.loadTasks();
        this.showDeleteModal = false;
        this.taskToDelete = undefined;
      });
    }
  }
}
