import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { AuthGuard } from './features/auth/auth.guard';
import { UsuariosComponent } from './features/auth/usuarios/usuarios.component';
import { PersonasComponent } from './features/auth/personas/personas.component';
import { ProveedoresComponent } from './features/proveedores/proveedores.component';
import { AjustesComponent } from './features/ajustes/ajustes.component';
import { ArticulosComponent } from './features/articulos/articulos.component';
import { EntradasComponent } from './features/entradas/entradas.component';
import { SucursalesComponent } from './features/sucursales/sucursales.component';
import { InsumosComponent } from './features/insumos/insumos.component';
import { RecetasComponent } from './features/recetas/recetas.component';
import { bancosComponent } from './features/bancos/bancos.component';
import { OrdenCompraComponent } from './features/orden-compra/orden-compra.component';
import { TraspasosComponent } from './features/traspasos/traspasos.component';
import { MovimientosComponent } from './features/movimientos/movimientos.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { PermisosComponent } from './features/permisos/permisos.component';



const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent, title: "Iniciar sesión" },
  { path: "inicio", component: InicioComponent, canActivate:[AuthGuard] , title: "ERP - Inicio" },
  { path: "personas", component: PersonasComponent, canActivate:[AuthGuard], title: "ERP - Modulo personas" },
  { path: "usuarios", component: UsuariosComponent, canActivate:[AuthGuard], title: "ERP - Modulo de usuarios" },
  { path: "proveedores", component: ProveedoresComponent, canActivate:[AuthGuard], title: "ERP - Modulo de proveedores" },
  { path: "ajustes", component: AjustesComponent, canActivate:[AuthGuard], title: "Ajustes" },
  { path: "articulos", component:ArticulosComponent, canActivate:[AuthGuard], title: "ERP - Administrador de articulos" },
  { path: "entradas", component:EntradasComponent, canActivate:[AuthGuard], title: "ERP - Entradas" },
  { path: "sucursales", component:SucursalesComponent, canActivate:[AuthGuard], title: "ERP - Sucursales" },
  { path: "insumos", component:InsumosComponent, canActivate:[AuthGuard], title: "ERP - Insumos" },
  { path: "recetas", component:RecetasComponent, canActivate:[AuthGuard], title: "ERP - Recetas" },
  { path: "bancos", component:bancosComponent, canActivate:[AuthGuard], title: "ERP - Bancos" },
  { path: "compras", component:OrdenCompraComponent, canActivate:[AuthGuard],title: "ERP - Compras" },
  { path: "traspasos", component:TraspasosComponent, canActivate:[AuthGuard], title: "ERP - Traspasos" },
  { path: "movimientos", component:MovimientosComponent, canActivate:[AuthGuard], title: "ERP - Movimientos" },
  { path: "reportes", component:ReportesComponent, canActivate:[AuthGuard], title: "ERP - Reportes" },
  { path: "permisos", component:PermisosComponent, canActivate:[AuthGuard], title: "ERP - Permisos" },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
