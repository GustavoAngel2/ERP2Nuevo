import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {
  bancosForm!: FormGroup;
  Bancos: any[] = [];
  bancosId = 1;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.bancosForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      idFamilia: ['', Validators.required],
      idUM: ['', Validators.required],
      ultimoCosto: [0, Validators.required],
      precioVenta: [0, Validators.required],
      iva: [0, Validators.required],
      ieps: [0, Validators.required],
      idUsuario: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  agregarBancos() {
    if (this.bancosForm.valid) {
      const nuevoBancos = {
        id: ++this.bancosId,
        ...this.bancosForm.value
      };

      this.Bancos.push(nuevoBancos);
      console.log('Bancos agregado:', nuevoBancos);

      // Resetear el formulario
      this.bancosForm.reset();
    } else {
      console.log('Formulario no válido');
    }
  }

  eliminarBancos(index: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este banco?')) {
      this.Bancos.splice(index, 1);
    }
  }

  editarBancos(index: number) {
    alert('¡La edición de bancos aún no está implementada!');
  }
}