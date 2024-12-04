import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService, currentUser } from '../auth.service';
import { articulosModel, updateArticuloModel } from '../data-models/articulos.model';
import { ArticulosService } from '../data.service';
import { UMservice } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  datosCargados: boolean = false;

  displayedColumns: string[] = ['Id', 'Codigo','Familia', 'Descripcion', 'UM', 'Usuario', 'UltimoCosto', 'PrecioVenta','Iva','Ieps', 'FechaReg', 'FechaAct', 'Acciones'];
  dataSource: MatTableDataSource<articulosModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
  private articulosService: ArticulosService, 
  private umService: UMservice,
    public dialog: MatDialog,
    private authService: AuthService,  
    private toastr:ToastrService
  ) {
    this.dataSource = new MatTableDataSource<articulosModel>();
  }
  isModifying:boolean = false;
  Id: number = 0;
  descripcion: string = '';
  codigo: string = '';
  familia: number = 0;
  um: number = 0;
  costo: number = 0;
  precio: number = 0;
  iva: number = 0;
  ieps: number = 0;
  usuario: number = 0;
  ComboUm: any[] = [];

  loggedInUser: currentUser = { Id: '', NombreUsuario: '', NombrePersona: '', IdRol: '' };

  ngOnInit() {
  this.getData();
  this.setCombos();
    this.loggedInUser = this.authService.getCurrentUser(); 
    console.log('Usuario logeado:', this.loggedInUser);
  }

 insertar(): void {
  const nuevoArticulo = {
     Descripcion: this.descripcion,
     Codigo: this.codigo,
     Familia: this.familia,
     UM: this.um,  
     UltimoCosto: this.costo,
     PrecioVenta: this.precio,
     Iva: this.iva,
     Ieps: this.ieps,
     Usuario: parseInt(this.loggedInUser.Id, 10) 
   };
   console.log(nuevoArticulo)
   this.articulosService.InsertArticulo(nuevoArticulo).subscribe({
    next: (response) => {
      if(response.StatusCode == 200){
        this.toastr.success(response.response.data, 'Articulos');
      } else {
        this.toastr.error(response.response.data,'Articulos')
      }
      this.getData();
      this.limpiar();
    },
    error: (error) => {

      console.error('Hubo un error al insertar el articulo', error);
    }
  });
 }

 getData() {
   this.dataSource.filterPredicate = (data: articulosModel, filter: string) => {
     return data.Descripcion.toLowerCase().includes(filter) || 
            data.Id.toString().includes(filter); 
   };
   this.articulosService.getArticulos().subscribe({
     next: (response) => {
      console.log('Respuesta del servidor:', response); 
      this.dataSource.data = response.Response.data; 
     },
     error: (error) => {
      console.error(error);
     }
   });
 }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }

 setCombos(){

  this.umService.getUM().subscribe({
    next: (response) => {
        this.ComboUm = response.Response.data;
        console.log('no contiene datos');
    },
    error: (error) => {
      console.error(error);
    }
  });
}


 editar(): void {
  const Articulo:updateArticuloModel   = {
    Id: this.Id,
    Descripcion: this.descripcion,
    Codigo: this.codigo,
    Familia: this.familia,
    UM: this.um,  
    UltimoCosto: this.costo,
    PrecioVenta: this.precio,
    Iva: this.iva,
    Ieps: this.ieps,
    Usuario: parseInt(this.loggedInUser.Id, 10) 
  };
  console.log(Articulo)
  this.articulosService.updateArticulo(Articulo).subscribe({
    next: (response) => {
      if(response.StatusCode == 200){
        this.toastr.success(response.response.data, 'Articulo');
      } //else {
      //   this.toastr.error(response.response.data,'Articulo')
      // }
      console.log(response);
      this.getData();
      this.limpiar();
    },
    error: (error) => {
      console.error(error);
    }
  });
 }

 cargarDatos(articulo: updateArticuloModel) {
   this.Id = articulo.Id;
   this.codigo = articulo.Codigo;
   this.descripcion = articulo.Descripcion;
   this.um = articulo.UM;
   this.familia = articulo.Familia
   this.costo = articulo.UltimoCosto;
   this.precio = articulo.PrecioVenta;
   this.iva= articulo.Iva;
   this.ieps = articulo.Ieps;
   this.datosCargados = true;
   this.isModifying = true
   console.log(articulo.Id)
 }

 limpiar(): void {
   this.codigo = "";
   this.descripcion = "";
   this.um = 0;
   this.costo = 0;
   this.precio = 0;
   this.iva = 0;
   this.ieps =0;
   this.usuario = 0;
   this.datosCargados = false;
   this.isModifying = false
 }

 abrirDeleteDialog(Id: number, Name: string) {
  const dialogRef = this.dialog.open(DeleteMenuComponent, {
    width: '550px',
    data: Name
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result == "yes") {
      this.articulosService.deleteArticulo(Id).subscribe({
        next: (response) => {
          if(response.StatusCode == 200){
            this.toastr.success(response.Response.data, 'Articulos');
          } //else {
          //   this.toastr.error(response.Response.data,'Articulos')
          // }
          this.getData();
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el Articulo', error);
        }
      });
    }
  });
}
}
