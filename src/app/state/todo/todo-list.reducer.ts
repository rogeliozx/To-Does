import { createReducer, on } from '@ngrx/store';
import {
  deleteTodoItems,
  loadedTodoItems,
  loadTodoItems,
  addTodoItems,
  addSubTodoItems,
  deleteSubTodoItems,
  updateTodoItems,
  sortTodos,
  updateSubTodoItem,
} from './todo-list.action';
import { ItemListState, SortType } from '../../types/stateTypes';
import { Todo } from '../../types/general';

export const initialState: ItemListState = {
  todoList: [],
};

export const itemListReducer = createReducer(
  initialState,
  on(deleteTodoItems, (state, { index }) => ({
    ...state,
    todoList: state.todoList.filter((_, i) => i !== index),
  })),
  on(loadTodoItems, (state) => ({
    ...state,
    load: true,
  })),
  on(addTodoItems, (state, { todo }) => {
    return {
      ...state,
      todoList: [...state.todoList, todo],
    };
  }),
  on(loadedTodoItems, (state, { todoList }) => ({
    ...state,
    load: false,
    todoList,
  })),
  on(addSubTodoItems, (state, { todoId, subTodo }) => ({
    ...state,
    todoList: state.todoList.map((todo) =>
      todo.id === todoId
        ? { ...todo, subTodos: [...(todo.subTodos || []), subTodo] }
        : todo
    ),
  })),
  on(deleteSubTodoItems, (state, { todoId, subTodoId }) => ({
    ...state,
    todoList: state.todoList.map((todo) =>
      todo.id === todoId
        ? {
            ...todo,
            subTodos: todo.subTodos?.filter(
              (subTodo) => subTodo.id !== subTodoId
            ),
          }
        : todo
    ),
  })),
  on(updateTodoItems, (state, { todoId }) => ({
    ...state,
    todoList: state.todoList.map((todo) =>
      todo.id === todoId
        ? {
            ...todo,
            completed: !todo.completed,
            subTodos: todo.subTodos?.map((subTodo) => ({
              ...subTodo,
              completed: !subTodo.completed,
            })),
          }
        : todo
    ),
  })),
  on(sortTodos, (state, { sortType }) => {
    let sortedTodos: Todo[] = [...state.todoList];
    switch (sortType) {
      case SortType.COMPLETED:
        sortedTodos.sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? -1 : 1
        );
        break;
      case SortType.DATE:
        sortedTodos.sort(
          (a, b) =>
            new Date(b.dateCreated ?? 0).getTime() -
            new Date(a.dateCreated ?? 0).getTime()
        );
        break;
      case SortType.ALPHABETICAL:
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return {
      ...state,
      todoList: sortedTodos,
    };
  }),
  on(updateSubTodoItem, (state, { todoId, subTodoId }) => ({
    ...state,
    todoList: state.todoList.map((todo) =>
      todo.id === todoId
        ? {
            ...todo,
            subTodos: todo.subTodos?.map((subTodo) =>
              subTodo.id === subTodoId
                ? { ...subTodo, completed: !subTodo.completed }
                : subTodo
            ),
          }
        : todo
    ),
  }))
);
