import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() editingTask: Task | null = null;

  @Output() titleChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  submitTask() {
    if (!this.title.trim()) return;

    const handleSuccess = () => {
      this.saved.emit();
      this.cancel.emit();
      this.resetForm();
    };

    if (this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        title: this.title,
        description: this.description,
      };

      this.taskService
        .updateTask(updatedTask._id!, {
          title: this.title,
          description: this.description,
        })
        .subscribe(handleSuccess);
    } else {
      this.taskService
        .createTask({ title: this.title, description: this.description })
        .subscribe(handleSuccess);
    }
  }

  private resetForm() {
    this.title = '';
    this.description = '';
  }
}
