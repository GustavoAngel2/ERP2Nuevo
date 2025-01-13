import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-list',
  templateUrl: './button-list.component.html',
  styleUrl: './button-list.component.css'
})
export class ButtonListComponent {
  @Input() label: string = 'Button'; // Texto del botón
}
