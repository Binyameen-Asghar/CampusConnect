import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconSectionComponent } from './components/icon-section/icon-section.component';
import { ReminderSectionComponent } from './components/reminder-section/reminder-section.component';
import { TodoSectionComponent } from './components/todo-section/todo-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    IconSectionComponent,
    ReminderSectionComponent,
    TodoSectionComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar
        (newReminder)="onNewReminder()"
        (newTodo)="onNewTodo()"
      ></app-navbar>
      <main class="container mx-auto px-4 py-6 space-y-6">
        <app-icon-section></app-icon-section>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <app-reminder-section
            [isModalOpen]="reminderModalOpen"
            (modalClose)="onReminderModalClose()"
          ></app-reminder-section>
          <app-todo-section
            [isModalOpen]="todoModalOpen"
            (modalClose)="onTodoModalClose()"
          ></app-todo-section>
        </div>
      </main>
    </div>
  `
})
export class AppComponent {
  reminderModalOpen = false;
  todoModalOpen = false;

  onNewReminder() {
    this.reminderModalOpen = true;
  }

  onNewTodo() {
    this.todoModalOpen = true;
  }

  onReminderModalClose() {
    this.reminderModalOpen = false;
  }

  onTodoModalClose() {
    this.todoModalOpen = false;
  }
}