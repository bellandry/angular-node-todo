import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  showModal: boolean = false;
  editingTask: any = null;

  title: string = '';
  description: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
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
}
