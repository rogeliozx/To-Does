import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListComponent} from './components/list/list.component'
import { ListViewComponent } from "./page/list-view/list-view.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListViewComponent,ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';
}
