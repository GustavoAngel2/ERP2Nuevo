import { Component, OnInit } from '@angular/core';
import { OrdenComprasService } from '../data.service';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrl: './orden-compra.component.css'
})
export class OrdenCompraComponent implements OnInit{
  constructor(private OrdenCompra:OrdenComprasService){

  }

  isModifying: boolean = true

  ngOnInit(): void {
    this.OrdenCompra.getOrdenCompras().subscribe({
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
