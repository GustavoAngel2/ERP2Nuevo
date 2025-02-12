import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-silent-input',
  templateUrl: './silent-input.component.html',
  styleUrls: ['./silent-input.component.css']
})
export class SilentInputComponent {
  @Input() placeholder: string = '';
  @Input() value: string | null = ''; // Permitir valores nulos
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Asegurar que es un input
    this.value = inputElement.value;
    this.valueChange.emit(inputElement.value);
  }
}
