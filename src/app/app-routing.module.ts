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
import { ColaboradoresComponent } from './features/colaboradores/colaboradores.component';

//canActivate:[AuthGuard] ,

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent, title: "Iniciar sesión" },
  { canActivate:[AuthGuard], path: "inicio", component: InicioComponent, title: "ERP - Inicio" },
  { canActivate:[AuthGuard], path: "personas", component: PersonasComponent, title: "ERP - Modulo personas" },
  { canActivate:[AuthGuard], path: "usuarios", component: UsuariosComponent, title: "ERP - Modulo de usuarios" },
  { canActivate:[AuthGuard], path: "proveedores", component: ProveedoresComponent,  title: "ERP - Modulo de proveedores" },
  { canActivate:[AuthGuard], path: "ajustes", component: AjustesComponent,  title: "Ajustes" },
  { canActivate:[AuthGuard], path: "articulos", component:ArticulosComponent,  title: "ERP - Administrador de articulos" },
  { canActivate:[AuthGuard], path: "entradas", component:EntradasComponent,  title: "ERP - Entradas" },
  { canActivate:[AuthGuard], path: "sucursales", component:SucursalesComponent,  title: "ERP - Sucursales" },
  { canActivate:[AuthGuard], path: "insumos", component:InsumosComponent, title: "ERP - Insumos" },
  { canActivate:[AuthGuard], path: "recetas", component:RecetasComponent, title: "ERP - Recetas" },
  { canActivate:[AuthGuard], path: "bancos", component:bancosComponent, title: "ERP - Bancos" },
  { canActivate:[AuthGuard], path: "compras", component:OrdenCompraComponent, title: "ERP - Compras" },
  { canActivate:[AuthGuard], path: "traspasos", component:TraspasosComponent,  title: "ERP - Traspasos" },
  { canActivate:[AuthGuard], path: "movimientos", component:MovimientosComponent, title: "ERP - Movimientos" },
  { canActivate:[AuthGuard], path: "reportes", component:ReportesComponent, title: "ERP - Reportes" },
  { canActivate:[AuthGuard], path: "permisos", component:PermisosComponent, title: "ERP - Permisos" },
  { canActivate:[AuthGuard], path: "colaboradores", component:ColaboradoresComponent, title: "ERP - Colaboradores" },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
