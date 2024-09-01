import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ListViewComponent } from './list-view.component'; // Asegúrate de que el camino sea correcto
import { itemListReducer } from '../../state/todo/todo-list.reducer';
import { sortTodos } from '../../state/todo/todo-list.action';
import { SortType } from '../../types/stateTypes';
import { of } from 'rxjs';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    // Crear un espía para el store
    store = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    // Configurar el módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [
        ListViewComponent, // Importar el componente independiente aquí
        StoreModule.forRoot({ itemList: itemListReducer }) // Configurar el Store
      ],
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch sortTodos action on sort change', () => {
    // Crear un evento de cambio
    const event = {
      target: { value: SortType.COMPLETED } as HTMLSelectElement
    } as unknown as Event;

    // Llamar a la función que se espera que despache la acción
    component.onSortChange(event);

    // Asegurarse de que el dispatch se ha llamado con la acción esperada
    expect(store.dispatch).toHaveBeenCalledWith(sortTodos({ sortType: SortType.COMPLETED }));
  });
});
