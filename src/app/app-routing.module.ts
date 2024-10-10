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
import { SucursalesComponent } from './sucursales/sucursales.component';
import { InsumosComponent } from './insumos/insumos.component';
import { DetalleOrdenCompraComponent } from './detalle-orden-compra/detalle-orden-compra.component';



const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent, title: "Iniciar sesión" },
  { path: "inicio", component: InicioComponent, canActivate:[AuthGuard] , title: "ERP - Inicio" },
  { path: "personas", component: PersonasComponent, canActivate:[AuthGuard], title: "ERP - Moduulo personas" },
  { path: "usuarios", component: UsuariosComponent, canActivate:[AuthGuard], title: "ERP - Modulo de usuarios" },
  { path: "proveedores", component: ProveedoresComponent, canActivate:[AuthGuard], title: "ERP - Modulo de proveedores" },
  { path: "ajustes", component: AjustesComponent, canActivate:[AuthGuard], title: "Ajustes" },
  { path: "articulos", component:ArticulosComponent, canActivate:[AuthGuard], title: "ERP - Administrador de articulos" },
  { path: "entradas", component:EntradasComponent, canActivate:[AuthGuard], title: "ERP - Entradas" },
  { path: "sucursales", component:SucursalesComponent, canActivate:[AuthGuard], title: "ERP - Sucursales" },
  { path: "insumos", component:InsumosComponent, canActivate:[AuthGuard], title: "ERP - Insumos" },
  { path: "detallecompras", component:DetalleOrdenCompraComponent, canActivate:[AuthGuard], title: "ERP - Ordenes de compras" },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
