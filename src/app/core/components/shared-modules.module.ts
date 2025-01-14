import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeButtonsComponent } from './home-buttons/home-buttons.component';
import { MenuListComponent } from './menu-list/menu-list.component';

@NgModule({
  declarations: [
    HomeButtonsComponent,
    MenuListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeButtonsComponent,
    MenuListComponent
  ]
})

export class SharedModule { }
