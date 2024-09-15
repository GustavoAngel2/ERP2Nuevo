//Funciones angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
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
//Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PersonasComponent } from './personas/personas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

@NgModule({
  declarations: [
    //Componentes
    AppComponent,
    InicioComponent,
    LoginComponent,
    PersonasComponent,
    UsuariosComponent,
    ProveedoresComponent
  ],
  imports: [
    //Dependencias
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    FormsModule,
    NgIf,
    HttpClientModule,
    
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
    MatExpansionModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent] //Interfaz de Inicio
})
export class AppModule { }
