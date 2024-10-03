import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { EntradasService } from '../data.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent implements OnInit{ 
    constructor (private entradasService:EntradasService){

    }
    ngOnInit(): void {
      this.entradasService.getEntradas().subscribe({
        next:(response)=>{
          console.log(response)
        }
      })
    }
}
