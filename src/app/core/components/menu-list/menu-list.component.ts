import { Component } from '@angular/core';
import { ERP } from '../../../erp-settings';
import { Router } from '@angular/router';

@Component({
  selector: 'side-bar',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
  constructor(private erp:ERP, private router:Router){}

  modules = this.erp.modules

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
