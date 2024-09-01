import { createAction, props } from '@ngrx/store';
import { Todo } from '../../types/general';
import { SortType } from '../../types/stateTypes';

export const loadTodoItems = createAction('[List to-do] Load to-do');

export const loadedTodoItems = createAction(
  '[List to-do] Load to-do success',
  props<{ todoList: Todo[] }>()
);

export const loadedFailureTodoItems = createAction(
  '[List] Load to-do Failure',
  props<{ error: any }>()
);

export const deleteTodoItems = createAction(
  '[List to-do] delete to-do',
  props<{ index: number }>()
);

export const updateTodoItems = createAction(
  '[List to-do] update to-do',
  props<{ todoId: string }>()
);

export const addTodoItems = createAction(
  '[List to-do] add to-do',
  props<{ todo: Todo }>()
);

export const updateSubTodoItem = createAction(
  '[List to-do] update  subTodo',
  props<{ todoId: string,subTodoId:string }>()
);
export const deleteSubTodoItems = createAction(
  '[List to-do] delete subTodo',
  props<{ todoId: string; subTodoId: string }>()
);

export const addSubTodoItems = createAction(
  '[List todos] add subTodo',
  props<{ todoId: string; subTodo: Todo }>()
);

export const sortTodos = createAction(
  '[Todo] Sort Todos',
  props<{ sortType: SortType }>()
);