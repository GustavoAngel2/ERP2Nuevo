import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeButtonsComponent } from './home-buttons/home-buttons.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CursorComponent } from './cursor/cursor.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { SilentInputComponent } from './silent-input/silent-input.component';

@NgModule({
  declarations: [
    HomeButtonsComponent,
    MenuListComponent,
    CursorComponent,
    UserModalComponent,
    SilentInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeButtonsComponent,
    MenuListComponent,
    CursorComponent,
    UserModalComponent,
    SilentInputComponent
  ]
})

export class SharedModule { }
