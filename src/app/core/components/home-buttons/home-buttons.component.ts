import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrl: './home-buttons.component.css'
})
export class HomeButtonsComponent {
  @Input() text: string = '';
  @Input() color: string = 'blue';
  @Input() icon: string = '';
  @Input() path: string = '/inicio';

  constructor(private router:Router){}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
