import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { getUsuariosModel } from '../../models/usuario.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  elemento: getUsuariosModel
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: getUsuariosModel
  ) {
    this.elemento = data
  }

  buttonAction(action: string): void {
    this.dialogRef.close(action);
  }
}