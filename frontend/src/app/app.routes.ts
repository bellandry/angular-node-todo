import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];
