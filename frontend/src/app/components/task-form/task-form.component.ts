import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  title = '';
  description = '';
  @Output() saved = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  submitTask() {
    if (!this.title.trim()) return;
    this.taskService
      .createTask({ title: this.title, description: this.description })
      .subscribe(() => {
        this.saved.emit();
        this.title = '';
        this.description = '';
      });
  }
}
