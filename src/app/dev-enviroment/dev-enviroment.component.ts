import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators'; // Importamos tap para logging
import { insumosModel } from '../data-models/insumos.model';
import { InsumosService } from '../data.service';

@Component({
  selector: 'app-dev-enviroment',
  templateUrl: './dev-enviroment.component.html',
  styleUrls: ['./dev-enviroment.component.css']
})
export class DevEnviromentComponent {
  options = [
    { Id: 1, Descripcion: 'Opción 1' },
    { Id: 2, Descripcion: 'Opción 2' },
    { Id: 3, Descripcion: 'Opción 3' }
  ];

  insumoId: number | null = 0;
  myControl = new FormControl('');
  filteredOptions!: Observable<{ Id: number; Descripcion: string }[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    // Limpia el insumoId si no se selecciona una opción válida
    this.myControl.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.insumoId = null;
      }
    });
  }

  private _filter(value: string | { Id: number; Descripcion: string }): { Id: number; Descripcion: string }[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.Descripcion.toLowerCase();
    return this.options.filter(option =>
      option.Descripcion.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelected(option: { Id: number; Descripcion: string }) {
    this.insumoId = option.Id; // Guarda el Id
    this.myControl.setValue(option.Descripcion); // Muestra la descripción en el campo
    console.log(this.insumoId)
  }
}
