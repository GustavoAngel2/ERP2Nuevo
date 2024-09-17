import { Component, OnInit } from '@angular/core';
import { AuthService,currentUser } from '../auth.service';
import { ERP } from '../erp-settings';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit{

  profile:currentUser = {
    Id:"",
    IdRol:"",
    NombreUsuario:"",
    NombrePersona:""
  }

  constructor(private authService:AuthService,private erp: ERP){}

  ngOnInit(){
    this.profile = this.authService.getCurrentUser()
  }
}
