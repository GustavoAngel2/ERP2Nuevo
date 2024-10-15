//Funciones angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
//Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PersonasComponent } from './personas/personas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { EntradasComponent } from './entradas/entradas.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { BancosComponent } from './bancos/bancos.component';
import { RecetasComponent } from './recetas/recetas.component';
import { DetalleRecetasComponent } from './detalle-recetas/detalle-recetas.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { DetalleOrdenCompraComponent } from './detalle-orden-compra/detalle-orden-compra.component';
import { InsumosComponent } from './insumos/insumos.component';


@NgModule({
  declarations: [
    //Componentes
    AppComponent,
    InicioComponent,
    LoginComponent,
    PersonasComponent,
    UsuariosComponent,
    ProveedoresComponent,
    AjustesComponent,
    ArticulosComponent,
    EntradasComponent,
    SucursalesComponent,
    BancosComponent,
    RecetasComponent,
    DetalleRecetasComponent,
    OrdenCompraComponent,
    DetalleOrdenCompraComponent,
    InsumosComponent
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
    ToastrModule.forRoot({ positionClass: 'inline' })
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
