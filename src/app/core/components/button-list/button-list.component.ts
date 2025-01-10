import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-list',
  templateUrl: './button-list.component.html',
  styleUrl: './button-list.component.css'
})
export class ButtonListComponent {
  @Input() label: string = 'Button'; // Texto del botón
  @Input() color: string = 'primary'; // Estilo del botón (e.g., primary, secondary)
  @Input() disabled: boolean = false; // Deshabilitar el botón
  @Input() type: 'button' | 'submit' = 'button'; // Tipo del botón
}
