import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule, NgFor } from '@angular/common';
import { ListService } from '../../services/list.service';
import { ListComponent } from '../../components/list/list.component';
import { Todo } from '../../types/general';
import { ItemListState, SortType } from '../../types/stateTypes';
import { Observable } from 'rxjs';
import {
  loadTodoItems,
  loadedTodoItems,
  addTodoItems,
  sortTodos,
} from '../../state/todo/todo-list.action';

@Injectable()
@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [ListComponent, NgFor, CommonModule],
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(
    private todoService: ListService,
    private store: Store<{ itemList: ItemListState }>
  ) {
    this.todos$ = this.store.select((state) => state.itemList.todoList);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodoItems());
    this.todoService.get().subscribe((todoList) => {
      this.store.dispatch(loadedTodoItems({ todoList }));
    });
  }

  addTodo(input: HTMLInputElement) {
    const todo: Todo = {
      id: uuidv4(),
      subTodos: [],
      title: input.value,
      completed: false,
    };
    this.store.dispatch(addTodoItems({ todo }));
    input.value = '';
  }
  onSortChange(event: Event) {
    const sortType = (event.target as HTMLSelectElement).value as SortType;
    this.store.dispatch(sortTodos({ sortType }));
  }
}
