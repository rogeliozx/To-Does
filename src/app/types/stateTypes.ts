import { Todo } from "./general";

export interface ItemListState {
    todoList: Todo[];
  }

  export enum SortType {
    COMPLETED = 'COMPLETED',
    DATE = 'DATE',
    ALPHABETICAL = 'ALPHABETICAL',
  }