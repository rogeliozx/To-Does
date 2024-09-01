import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ItemListState } from './types/stateTypes';
import { Store } from '@ngrx/store';
import { ListComponent } from './components/list/list.component';
import { ListViewComponent } from './page/list-view/list-view.component';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  const initialState: ItemListState = {
    todoList: [],
  };
  let store: MockStore<{ itemList: ItemListState }>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet, ListViewComponent, ListComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<{ itemList: ItemListState }>;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "todo-list"', () => {
    expect(component.title).toEqual('todo-list');
  });

  it('should render the title in a h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TO-DOS');
  });
});
