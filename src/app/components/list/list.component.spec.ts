import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { itemListReducer } from '../../state/todo/todo-list.reducer'; // Asume que tienes un reductor
import { Todo } from '../../types/general';
import { deleteTodoItems, updateTodoItems, addSubTodoItems, deleteSubTodoItems, updateSubTodoItem } from '../../state/todo/todo-list.action';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        StoreModule.forRoot({ itemList: itemListReducer }),
        ListComponent // Importa el componente standalone aquí
      ],
      providers: [{ provide: Store, useValue: storeSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch deleteTodoItems action', () => {
    component.index = 0;
    component.deleteTodo();
    expect(store.dispatch).toHaveBeenCalledWith(deleteTodoItems({ index: 0 }));
  });

  it('should dispatch updateTodoItems action', () => {
    const todoId = 'test-id';
    component.toggleComplete(todoId);
    expect(store.dispatch).toHaveBeenCalledWith(updateTodoItems({ todoId }));
  });

  it('should dispatch updateSubTodoItem action', () => {
    const subTodoId = 'subtodo-id';
    component.todo = { id: 'todo-id', title: 'Test Todo', completed: false, subTodos: [] }; // Asegúrate de que el todo está inicializado
    component.toggleSubtaskComplete(subTodoId);
    expect(store.dispatch).toHaveBeenCalledWith(updateSubTodoItem({ todoId: component.todo.id, subTodoId }));
  });

  it('should dispatch deleteSubTodoItems action', () => {
    const subTodoId = 'subtodo-id';
    component.todo = { id: 'todo-id', title: 'Test Todo', completed: false, subTodos: [] }; // Asegúrate de que el todo está inicializado
    component.deleteSubtask(component.todo.id, subTodoId);
    expect(store.dispatch).toHaveBeenCalledWith(deleteSubTodoItems({ todoId: component.todo.id, subTodoId }));
  });
});
