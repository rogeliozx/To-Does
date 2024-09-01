import { TestBed } from '@angular/core/testing';
import { ListService } from './list.service';
import { Todo } from '../types/general';
import { of } from 'rxjs';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListService],
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable with a list of todos', (done: DoneFn) => {
    const expectedTodos: Todo[] = [
      {
        dateCreated: '2023-09-05T18:00:00',
        id: 'f3335538-7c14-49e9-aff3-b9b0690d6607',
        title: 'Review Figma Design',
        completed: true,
        subTodos: [
          {
            id: '230a59e7-0398-40a7-8b02-b191d32d079c',
            title:
              'The code you submit should match the UI of the Figma design as closely as possible',
            completed: true,
          },
        ],
      },
      {
        dateCreated: '2023-11-22T09:15:00',
        id: 'fc17b626-0d91-4198-ae48-345e72998555',
        title:
          'Create a component and get the to-do list data from the list.service.ts',
        completed: false,
        subTodos: [
          {
            id: '5cb8e192-1ab9-496e-b5f9-4eca9ce1d9dd',
            title:
              'Make sure the items are ordered by the dateCreated value (newest items should appear at the bottom of the list)',
            completed: false,
          },
        ],
      },
      // Añade el resto de los todos esperados aquí...
    ];
    spyOn(service, 'get').and.returnValue(of(expectedTodos));
    service.get().subscribe(todos => {
      expect(todos.length).toBe(expectedTodos.length); // Verifica que la longitud sea la esperada
      expect(todos).toEqual(expectedTodos); // Verifica que el contenido sea el esperado
      done();
    });
  });
});
