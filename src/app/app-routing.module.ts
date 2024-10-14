import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PersonasComponent } from './personas/personas.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AjustesComponent } from './ajustes/ajustes.component';



const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "inicio", component: InicioComponent, canActivate:[AuthGuard] },
  { path: "personas", component: PersonasComponent, canActivate:[AuthGuard] },
  { path: "usuarios", component: UsuariosComponent, canActivate:[AuthGuard] },
  { path: "proveedores", component: ProveedoresComponent, canActivate:[AuthGuard] },
  { path: "ajustes", component: AjustesComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
