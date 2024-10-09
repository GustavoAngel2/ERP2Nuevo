import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { InsumosService } from '../data.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css'
})
export class InsumosComponent implements OnInit{

  constructor(private insumosService:InsumosService){

  }

  ngOnInit(): void {
    this.insumosService.getInsumos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response)&&response.length>0) {
          // this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
          console.log(response);
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
