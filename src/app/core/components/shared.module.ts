import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeButtonsComponent } from './home-buttons/home-buttons.component';

@NgModule({
  declarations: [
    HomeButtonsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeButtonsComponent
  ]
})
export class SharedModule { }
