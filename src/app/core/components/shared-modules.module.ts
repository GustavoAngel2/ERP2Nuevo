import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeButtonsComponent } from './home-buttons/home-buttons.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CursorComponent } from './cursor/cursor.component';

@NgModule({
  declarations: [
    HomeButtonsComponent,
    MenuListComponent,
    CursorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeButtonsComponent,
    MenuListComponent,
    CursorComponent
  ]
})

export class SharedModule { }
