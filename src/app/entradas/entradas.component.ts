import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService,currentUser } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { EntradasService } from '../data.service';
import { entradasModel } from '../data-models/entradas.model';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Proveedor', 'Factura','Sucursal','FechaEntrega', 'FechaRegistro', 'FechaActualiza', 'UsuarioActualiza', 'Acciones'];
  dataSource: MatTableDataSource<entradasModel>;

  id: number = 0;
  idProveedor: number = 0;
  factura: string = '';
  idSurcursal: number = 0;
  usuarioActualiza: number = 0;
  isModifying:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private entradasService: EntradasService, public dialog:MatDialog, public authService: AuthService, private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource<entradasModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.loggedUser = this.authService.getCurrentUser()
    this.getData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Método para realizar el filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData(){
    this.dataSource.filterPredicate = (data: entradasModel, filter: string) => {
      return data.Factura.toString().toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); 
    };
    this.entradasService.getEntradas().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        this.dataSource.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
        console.log(response)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertar():void {
    const nuevaEntrada = {
      idProveedor: this.idProveedor,
      factura: this.factura,
      idSurcursal: this.idSurcursal,
      usuarioActualiza: parseInt(this.loggedUser.Id,10) 
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.entradasService.insertarEntrada(nuevaEntrada).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Proveedores');
        } else {
          this.toastr.error(response.response.data,'Proveedores')
        }
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  abrirDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.entradasService.deleteEntrada(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Proveedores');
            } else {
              this.toastr.error(response.response.data,'Proveedores')
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });
      }
    });
  }

  // cargar(elemento:entradasModel){
  //   this.id = elemento.Id
  //   this.nombre = elemento.Nombre
  //   this.direccion = elemento.Direccion
  //   this.telefono = elemento.Telefono
  //   this.idBanco=elemento.IdBanco
  //   this.plazoPago=elemento.PlazoPago
  //   this.correo=elemento.Correo
  //   this.rfc=elemento.RFC
  //   this.razonSocial=elemento.RazonSocial
  //   this.clabe=elemento.CLABE
  //   this.isModifying = true
  // }

  limpiar(){
    this.id = 0
    this.idProveedor = 0;
    this.factura = '';
    this.idSurcursal = 0;
    this.isModifying = false
  }

  // editar(){
  //   const entrada:entradasUpdateModel   = {
  //     id: this.id,
  //     usuarioActualiza: parseInt(this.loggedUser.Id,10) ,

  //   };

  //   this.this.entradasService(entrada).subscribe({
  //     next: (response) => {
  //       if(response.StatusCode == 200){
  //         this.toastr.success(response.response.data, 'Proveedores');
  //       } else {
  //         this.toastr.error(response.response.data,'Proveedores')
  //       }
  //       console.log(response);
  //       this.getData();
  //       this.limpiar();
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }
}