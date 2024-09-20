import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PersonasComponent } from './personas/personas.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { EntradasComponent } from './entradas/entradas.component';


const routes: Routes = [
  { 
    path: "", 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: "login", 
    component: LoginComponent, 
    canActivate:[AuthGuard],
    title: "Iniciar sesión"
  },
  { 
    path: "inicio",
    component: InicioComponent, 
    canActivate:[AuthGuard] ,
    title: "ERP - Inicio"
  },
  { 
    path: "personas", 
    component: PersonasComponent, 
    canActivate:[AuthGuard],
    title: "ERP - Moduulo personas"
  },
  { 
    path: "usuarios", 
    component: UsuariosComponent, 
    canActivate:[AuthGuard],
    title: "ERP - Modulo de usuarios"
  },
  { 
    path: "proveedores", 
    component: ProveedoresComponent,
    canActivate:[AuthGuard],
    title: "ERP - Modulo de proveedores"
  },
  { 
    path: "ajustes", 
    component: AjustesComponent, 
    canActivate:[AuthGuard],
    title: "Ajustes"
  },
  { 
    path: "articulos", 
    component:ArticulosComponent, 
    canActivate:[AuthGuard],
    title: "ERP - Administrador de articulos"
  },
  { 
    path: "entradas", 
    component:EntradasComponent, 
    canActivate:[AuthGuard],
    title: "ERP - Entradas"
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
