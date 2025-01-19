import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ERP } from '../../../erp-settings';

@Component({
  selector: 'home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrl: './home-buttons.component.css'
})
export class HomeButtonsComponent {

  constructor(private router:Router, private erp:ERP){}

  modules = this.erp.modules;

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
