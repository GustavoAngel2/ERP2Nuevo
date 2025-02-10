import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ERP } from '../../../erp-settings';

@Component({
  selector: 'home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrl: './home-buttons.component.css'
})
export class HomeButtonsComponent {
  @Input() text: string = 'Click Me';
  @Input() color: string = 'blue';
  @Input() icon: string = 'home';
  @Input() path: string = '/inicio';

  constructor(private router:Router){}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
