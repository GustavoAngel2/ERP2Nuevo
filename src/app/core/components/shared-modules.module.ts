import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeButtonsComponent } from './home-buttons/home-buttons.component';
import { ButtonListComponent } from './button-list/button-list.component';

@NgModule({
  declarations: [
    HomeButtonsComponent,
    ButtonListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeButtonsComponent,
    ButtonListComponent
  ]
})

export class SharedModule { }
