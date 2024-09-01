import { loadTodoItems, loadedTodoItems, loadedFailureTodoItems, deleteTodoItems, updateTodoItems, addTodoItems, updateSubTodoItem, deleteSubTodoItems, addSubTodoItems, sortTodos } from './todo-list.action';
import { Todo } from '../../types/general';
import { SortType } from '../../types/stateTypes';

describe('Todo Actions', () => {
  
  it('should create a loadTodoItems action', () => {
    const action = loadTodoItems();
    expect(action.type).toBe('[List to-do] Load to-do');
  });

  it('should create a loadedTodoItems action with todoList', () => {
    const todoList: Todo[] = [
      { id: '1', title: 'Test Todo 1', completed: false },
      { id: '2', title: 'Test Todo 2', completed: true }
    ];
    const action = loadedTodoItems({ todoList });
    expect(action.type).toBe('[List to-do] Load to-do success');
    expect(action.todoList).toEqual(todoList);
  });

  it('should create a loadedFailureTodoItems action with error', () => {
    const error = new Error('Load failed');
    const action = loadedFailureTodoItems({ error });
    expect(action.type).toBe('[List] Load to-do Failure');
    expect(action.error).toEqual(error);
  });

  it('should create a deleteTodoItems action with index', () => {
    const index = 1;
    const action = deleteTodoItems({ index });
    expect(action.type).toBe('[List to-do] delete to-do');
    expect(action.index).toBe(index);
  });

  it('should create an updateTodoItems action with todoId', () => {
    const todoId = 'test-id';
    const action = updateTodoItems({ todoId });
    expect(action.type).toBe('[List to-do] update to-do');
    expect(action.todoId).toBe(todoId);
  });

  it('should create an addTodoItems action with todo', () => {
    const todo: Todo = { id: 'test-id', title: 'Test Todo', completed: false };
    const action = addTodoItems({ todo });
    expect(action.type).toBe('[List to-do] add to-do');
    expect(action.todo).toEqual(todo);
  });

  it('should create an updateSubTodoItem action with todoId and subTodoId', () => {
    const todoId = 'todo-id';
    const subTodoId = 'subtodo-id';
    const action = updateSubTodoItem({ todoId, subTodoId });
    expect(action.type).toBe('[List to-do] update  subTodo');
    expect(action.todoId).toBe(todoId);
    expect(action.subTodoId).toBe(subTodoId);
  });

  it('should create a deleteSubTodoItems action with todoId and subTodoId', () => {
    const todoId = 'todo-id';
    const subTodoId = 'subtodo-id';
    const action = deleteSubTodoItems({ todoId, subTodoId });
    expect(action.type).toBe('[List to-do] delete subTodo');
    expect(action.todoId).toBe(todoId);
    expect(action.subTodoId).toBe(subTodoId);
  });

  it('should create an addSubTodoItems action with todoId and subTodo', () => {
    const todoId = 'todo-id';
    const subTodo: Todo = { id: 'subtodo-id', title: 'Sub Todo', completed: false };
    const action = addSubTodoItems({ todoId, subTodo });
    expect(action.type).toBe('[List todos] add subTodo');
    expect(action.todoId).toBe(todoId);
    expect(action.subTodo).toEqual(subTodo);
  });

  it('should create a sortTodos action with sortType', () => {
    const sortType: SortType = SortType.DATE;
    const action = sortTodos({ sortType });
    expect(action.type).toBe('[Todo] Sort Todos');
    expect(action.sortType).toBe(sortType);
  });

});
