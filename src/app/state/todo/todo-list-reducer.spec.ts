import { itemListReducer, initialState } from './todo-list.reducer';
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
import { Todo } from '../../types/general';
import { SortType } from '../../types/stateTypes';

describe('itemListReducer', () => {

  it('should return the initial state', () => {
    const action = {} as any;
    const state = itemListReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadTodoItems action', () => {
    const action = loadTodoItems();
    const state = itemListReducer(initialState, action);
  });

  it('should handle loadedTodoItems action', () => {
    const todoList: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true }
    ];
    const action = loadedTodoItems({ todoList });
    const state = itemListReducer(initialState, action);
    expect(state.todoList).toEqual(todoList);
  });

  it('should handle deleteTodoItems action', () => {
    const initialStateWithTodos: any = {
      ...initialState,
      todoList: [
        { id: '1', title: 'Todo 1', completed: false },
        { id: '2', title: 'Todo 2', completed: true }
      ]
    };
    const action = deleteTodoItems({ index: 1 });
    const state = itemListReducer(initialStateWithTodos, action);
    expect(state.todoList.length).toBe(1);
    expect(state.todoList[0].id).toBe('1');
  });

  it('should handle addTodoItems action', () => {
    const newTodo: Todo = { id: '3', title: 'Todo 3', completed: false };
    const action = addTodoItems({ todo: newTodo });
    const state = itemListReducer(initialState, action);
    expect(state.todoList.length).toBe(1);
    expect(state.todoList[0]).toEqual(newTodo);
  });

  it('should handle addSubTodoItems action', () => {
    const todo: Todo = { id: '1', title: 'Todo 1', completed: false, subTodos: [] };
    const initialStateWithTodo: any = { ...initialState, todoList: [todo] };
    const subTodo: Todo = { id: 'sub1', title: 'Sub Todo 1', completed: false };
    const action = addSubTodoItems({ todoId: '1', subTodo });
    const state = itemListReducer(initialStateWithTodo, action);

    // Ensure `state.todoList` exists and has at least one element
    expect(state.todoList.length).toBe(1);
    expect(state.todoList[0].subTodos).toBeDefined();
    //@ts-ignore
    expect(state.todoList[0].subTodos.length).toBe(1);
     //@ts-ignore
    expect(state.todoList[0]?.subTodos[0]).toEqual(subTodo);
  });

  it('should handle deleteSubTodoItems action', () => {
    const subTodo: Todo = { id: 'sub1', title: 'Sub Todo 1', completed: false };
    const initialStateWithSubTodo: any = {
      ...initialState,
      todoList: [
        { id: '1', title: 'Todo 1', completed: false, subTodos: [subTodo] }
      ]
    };
    const action = deleteSubTodoItems({ todoId: '1', subTodoId: 'sub1' });
    const state = itemListReducer(initialStateWithSubTodo, action);

    // Ensure `state.todoList` exists and has at least one element
    expect(state.todoList.length).toBe(1);
    expect(state.todoList[0].subTodos).toBeDefined();
     //@ts-ignore
    expect(state.todoList[0].subTodos.length).toBe(0);
  });

  it('should handle updateTodoItems action', () => {
    const initialTodo: Todo = { id: '1', title: 'Todo 1', completed: false, subTodos: [] };
    const initialStateWithTodo: any = { ...initialState, todoList: [initialTodo] };
    const action = updateTodoItems({ todoId: '1' });
    const state = itemListReducer(initialStateWithTodo, action);

    // Ensure `state.todoList` exists and has at least one element
    expect(state.todoList.length).toBe(1);
    expect(state.todoList[0].completed).toBe(true);
    expect(state.todoList[0].subTodos).toBeDefined();
     //@ts-ignore
    expect(state.todoList[0].subTodos.every(subTodo => subTodo.completed)).toBe(true);
  });

  it('should handle sortTodos action by COMPLETED', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true }
    ];
    const initialStateWithTodos: any = { ...initialState, todoList: todos };
    const action = sortTodos({ sortType: SortType.COMPLETED });
    const state = itemListReducer(initialStateWithTodos, action);

    expect(state.todoList.length).toBe(2);
    expect(state.todoList[0].completed).toBe(true);
    expect(state.todoList[1].completed).toBe(false);
  });

  it('should handle sortTodos action by DATE', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false, dateCreated: '2024-01-01' },
      { id: '2', title: 'Todo 2', completed: false, dateCreated: '2024-01-02' }
    ];
    const initialStateWithTodos: any = { ...initialState, todoList: todos };
    const action = sortTodos({ sortType: SortType.DATE });
    const state = itemListReducer(initialStateWithTodos, action);

    // Ensure `state.todoList` exists and is sorted
    expect(state.todoList.length).toBe(2);
    expect(state.todoList[0].id).toBe('1');
    expect(state.todoList[1].id).toBe('2');
  });

  it('should handle sortTodos action by ALPHABETICAL', () => {
    const todos: Todo[] = [
      { id: '2', title: 'Todo B', completed: false },
      { id: '1', title: 'Todo A', completed: false }
    ];
    const initialStateWithTodos: any = { ...initialState, todoList: todos };
    const action = sortTodos({ sortType: SortType.ALPHABETICAL });
    const state = itemListReducer(initialStateWithTodos, action);

    // Ensure `state.todoList` exists and is sorted
    expect(state.todoList.length).toBe(2);
    expect(state.todoList[0].title).toBe('Todo A');
    expect(state.todoList[1].title).toBe('Todo B');
  });

  it('should handle updateSubTodoItem action', () => {
    const subTodo: Todo = { id: 'sub1', title: 'Sub Todo 1', completed: false };
    const initialStateWithSubTodo: any = {
      ...initialState,
      todoList: [
        { id: '1', title: 'Todo 1', completed: false, subTodos: [subTodo] }
      ]
    };
    const action = updateSubTodoItem({ todoId: '1', subTodoId: 'sub1' });
    const state = itemListReducer(initialStateWithSubTodo, action);

    // Ensure `state.todoList` exists and has at least one element
    expect(state.todoList.length).toBe(1);
    expect(state.todoList[0].subTodos).toBeDefined()
     //@ts-ignore;
    expect(state.todoList[0].subTodos.length).toBe(1);
     //@ts-ignore
    expect(state.todoList[0].subTodos[0].completed).toBe(true);
  });
});
