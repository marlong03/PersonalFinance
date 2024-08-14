import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from './header-component/header-component.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponentComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'financepersonal';
}
