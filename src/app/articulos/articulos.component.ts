import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articuloForm!: FormGroup;
  articulos: any[] = [];
  articuloId = 1;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.articuloForm = this.formBuilder.group({
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

  agregarArticulo() {
    if (this.articuloForm.valid) {
      const nuevoArticulo = {
        id: ++this.articuloId,
        ...this.articuloForm.value
      };

      this.articulos.push(nuevoArticulo);
      console.log('Artículo agregado:', nuevoArticulo);

      // Resetear el formulario
      this.articuloForm.reset();
    } else {
      console.log('Formulario no válido');
    }
  }

  eliminarArticulo(index: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      this.articulos.splice(index, 1);
    }
  }

  editarArticulo(index: number) {
    alert('¡La edición de artículos aún no está implementada!');
  }
}