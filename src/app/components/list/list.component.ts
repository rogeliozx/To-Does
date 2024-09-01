import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { Todo } from '../../types/general';
import { FormsModule } from '@angular/forms';
import { ItemListState } from '../../types/stateTypes';
import {
  addSubTodoItems,
  deleteSubTodoItems,
  deleteTodoItems,
  updateSubTodoItem,
  updateTodoItems,
} from '../../state/todo/todo-list.action';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  isCollapsed = false;
  @Input() todo: Todo = {
    completed: false,
    id: '',
    subTodos: [],
    title: '',
  };
  @Input() index!: number;

  @ViewChild('collapsibleContent') collapsibleContent!: ElementRef;

  constructor(private store: Store<{ itemList: ItemListState }>) {}

  deleteTodo() {
    this.store.dispatch(deleteTodoItems({ index: this.index }));
  }

  toggleComplete(todoId: string) {
    this.store.dispatch(updateTodoItems({ todoId }));
  }

  addSubtask(todo: Todo, input: HTMLInputElement) {
    const subTodo: Todo = {
      id: uuidv4(),
      title: input.value,
      completed: false,
    };
    this.store.dispatch(addSubTodoItems({ todoId: todo.id, subTodo }));
    input.value = '';
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    const content = this.collapsibleContent.nativeElement as HTMLElement;
    if (this.isCollapsed) {
      content.style.maxHeight = content.scrollHeight + 'px'; 
      setTimeout(() => (content.style.maxHeight = '0'), 0);
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'; 
      setTimeout(() => (content.style.maxHeight = 'auto'), 300);
    }
  }
  toggleSubtaskComplete( subTodoId: string) {
    this.store.dispatch(updateSubTodoItem({ todoId:this.todo.id, subTodoId }));
  }

  deleteSubtask(todoId: string, subTodoId: string) {
    this.store.dispatch(deleteSubTodoItems({ todoId, subTodoId }));
  }
}
