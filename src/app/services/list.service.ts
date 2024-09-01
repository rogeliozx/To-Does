import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../types/general';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor() {}

  get(): Observable<Todo[]> {
    const staticObject = [
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
      {
        dateCreated: '2024-01-10T12:30:00',
        id: '50a9fdad-2ee7-40b9-8c46-bf134f5aee1f',
        title: 'Render the list in your component',
        completed: false,
        subTodos: [
          {
            id: 'f2baaa1f-cfe4-4013-b61f-8b9c86f0fef0',
            title:
              'Child-level to-dos should be nested under their parent to-do item.',
            completed: false,
          },
        ],
      },
      {
        dateCreated: '2024-03-01T16:45:00',
        id: '987f3063-cf9d-4381-84ab-fb2f682da4eb',
        title:
          'Add the ability for the user to add new to-do items or sub to-do items',
        completed: false,
      },
      {
        dateCreated: '2024-05-15T08:00:00',
        id: '0388fb94-c669-4763-bee4-253e22aa0ae6',
        title:
          'Enable toggling each to-do item as completed. You do not need to persist the component state.',
        completed: false,
        subTodos: [
          {
            id: '15a01bdd-b3e0-4044-af53-0aea3850657c',
            title:
              'A completed to-do item should look like the first item in the Figma',
            completed: true,
          },
          {
            id: 'a47f7a34-07ad-47b9-b787-ad2e7813b377',
            title:
              'Toggling a to-do item complete at the top level should automatically mark the child-level to-dos complete',
            completed: false,
          },
        ],
      },
      {
        dateCreated: '2024-07-20T10:00:00',
        id: 'd3e44ceb-3913-4b08-804d-b8983777f24b',
        title: 'Submit this StackBlitz',
        completed: false,
        subTodos: [
          {
            id: 'a1bb1f85-d29e-4c15-b102-eaa7f1df1702',
            title: 'Click “Share” at the top of the page ',
            completed: false,
          },
          {
            id: 'febaab82-ef18-4df9-8ea0-0c7df99b85a1',
            title:
              'Copy the “Editor URL” and make sure the visibility is set to Public',
            completed: false,
          },
          {
            id: 'fe11d416-0a7a-4f29-9c8a-437da1ea4df4',
            title: 'Send the link to eric.rowe@stukent.com',
            completed: false,
          },
        ],
      },
      {
        dateCreated: '2024-07-20T10:00:00',
        id: '83b9fcdc-8be8-4007-9226-95156b840837',
        title: '(Optional) Bonus Tasks',
        completed: false,
        subTodos: [
          {
            id: '0f442b6c-c9fe-4db4-b770-801f52e56e04',
            title: 'Demonstrate proper parent/child component architecture',
            completed: false,
          },
          {
            id: '85f54564-2bd7-4e43-b83e-d4e61482c12d',
            title: 'Ensure responsiveness across a wide range of screen sizes',
            completed: false,
          },
          {
            id: '8a74d6bd-d68a-448f-977e-31aff54850c3',
            title: 'Add ability to delete items',
            completed: false,
          },
          {
            id: '4239d177-370c-4823-89b4-45a63b971a11',
            title:
              'Add ability to collapse a to-do item to show only the parent item',
            completed: false,
          },
          {
            id: 'fa3613b8-760f-4a69-9281-03b55c0355ea',
            title:
              'Add an animation when marking an item as completed (get creative)',
            completed: false,
          },
          {
            id: 'f42793c0-6ea9-47f8-8fe9-28bdc9e2af6d',
            title:
              'Add a dropdown at the top to select a different sort order for the list. The options should include Date Created, Completed, or Alphabetical.',
            completed: false,
          },
          {
            id: '50491906-9c85-432d-92da-13dafae13b68',
            title: 'Add an option to toggle dark mode',
            completed: false,
          },
        ],
      },
    ];
    return of(staticObject);
  }
}
