import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {

  constructor(private router:Router){}
  
  redirectUrl(url:string): void{
    this.router.navigate([url])
  }
}
