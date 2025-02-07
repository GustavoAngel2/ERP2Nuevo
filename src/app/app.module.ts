//Funciones angular
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
//Materiales
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { LoginComponent } from './features/auth/login/login.component';
import { PersonasComponent } from './features/auth/personas/personas.component';
import { UsuariosComponent } from './features/auth/usuarios/usuarios.component';
import { ProveedoresComponent } from './features/proveedores/proveedores.component';
import { AjustesComponent } from './features/ajustes/ajustes.component';
import { ArticulosComponent } from './features/articulos/articulos.component';
import { EntradasComponent } from './features/entradas/entradas.component';
import { SucursalesComponent } from './features/sucursales/sucursales.component';
import { bancosComponent } from './features/bancos/bancos.component';
import { RecetasComponent } from './features/recetas/recetas.component';
import { DetalleRecetasComponent } from './features/detalle-recetas/detalle-recetas.component';
import { OrdenCompraComponent } from './features/orden-compra/orden-compra.component';
import { TraspasosComponent } from './features/traspasos/traspasos.component';
import { MovimientosComponent } from './features/movimientos/movimientos.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { RolesComponent } from './features/roles/roles.component';
import { PermisosComponent } from './features/permisos/permisos.component';
import { InsumosComponent } from './features/insumos/insumos.component';
import { SharedModule } from './core/components/shared-modules.module';
import { PerfilUsuarioComponent } from './features/auth/perfil-usuario/perfil-usuario.component';


@NgModule({
  declarations: [
    //Componentes
    AppComponent,
    InicioComponent,
    LoginComponent,
    UsuariosComponent,
    ProveedoresComponent,
    AjustesComponent,
    ArticulosComponent,
    EntradasComponent,
    SucursalesComponent,
    bancosComponent,
    RecetasComponent,
    DetalleRecetasComponent,
    OrdenCompraComponent,
    InsumosComponent,
    TraspasosComponent,
    MovimientosComponent,
    ReportesComponent,
    RolesComponent,
    PermisosComponent,
    PersonasComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    //Dependencias
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    FormsModule,
    NgIf,
    HttpClientModule,
    HighchartsChartModule,
    //Materials
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatTableModule,
    MatTable,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    MatProgressBarModule,
    MatCheckboxModule,
    AsyncPipe,
    MatAutocompleteModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,

    }),
  ],
  bootstrap: [AppComponent] //Interfaz de Inicio
})
export class AppModule { }
