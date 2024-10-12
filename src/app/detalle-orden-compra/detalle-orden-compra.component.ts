import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ProveedoresService } from '../data.service';
import { getProveedoresModel, updateProveedorModel } from '../data-models/proveedores.model';
import { AuthService,currentUser } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { detallecomprasGetModel, detallecoprasUpdateModel } from '../data-models/detalleorden.model';

@Component({
  selector: 'app-detalle-orden-compra',
  templateUrl: './detalle-orden-compra.component.html',
  styleUrl: './detalle-orden-compra.component.css'
})
export class DetalleOrdenCompraComponent {
  // displayedColumns: string[] = ['Id', 'IdOrdenCompra', 'Insumo','Cantidad','CantidadRecibida', 'Costo','CostoRenglon', 'FechaRegistro', 'FechaActualiza', 'UsuarioActualiza', 'Acciones'];
  // dataSource: MatTableDataSource<detallecomprasGetModel>;

  // Id: number = 0;
  //   IdOrdenCompra: number = 0;
  //   Insumo: number = 0;
  //   Cantidad: number = 0;
  //   CantidadRecibida: number = 0;
  //   Costo: number = 0;
  //   CostoRenglon: number = 0;
  //   FechaRegistro: number =0;
  //   FechaActualiza: number = 0;
  //   UsuarioActualiza: string = "";
  //   Mensaje: string = "";

  // loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' ,}

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  // constructor(private proveedoresService: ProveedoresService, public dialog:MatDialog, public authService: AuthService, private toastr:ToastrService) {
  //   this.dataSource = new MatTableDataSource<detallecomprasGetModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
  // }

  // ngOnInit() {
  //   this.loggedUser = this.authService.getCurrentUser()
  //   this.getData()
  // }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  // // Método para realizar el filtrado
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // getData(){
  //   this.dataSource.filterPredicate = (data: detallecomprasGetModel, filter: string) => {
  //     return data.Id.toString().includes(filter) || 
  //            data.IdOrdenCompra.toString().includes(filter) ||
  //            data.Insumo.toString().includes(filter) ||
  //            data.Cantidad.toString().includes(filter)
  //            data.CantidadRecibida.toString().includes(filter)
  //            data.Costo.toString().includes(filter)
  //            data.CostoRenglon.toString().includes(filter)
  //   };
  //   this.proveedoresService.getProveedores().subscribe({
  //     next: (response) => {
  //       console.log('Respuesta del servidor:', response); 
  //       if (response && Array.isArray(response)&&response.length>0) {
  //         this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
  //       } else {
  //         console.log('no contiene datos');
  //       }
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }

  // insertar():void {
  //   const nuevaPersona = {
  //     idOrdenCompra : this.IdOrdenCompra, 
  //     insumo: this.Insumo,
  //     cantidad: this.Cantidad,
  //     usuarioActualiza: parseInt(this.loggedUser.Id,10) 
  //   };

  //   // Aquí asumo que tienes un método en tu servicio para insertar el departamento
  //   this.proveedoresService.insertarProovedor(nuevaPersona).subscribe({
  //     next: (response) => {
  //       if(response.StatusCode == 200){
  //         this.toastr.success(response.response.data, 'DetalleOrdenCompra');
  //       } else {
  //         this.toastr.error(response.response.data,'DetalleOrdenCompra')
  //       }
  //       this.getData();
  //       this.limpiar();
  //     },
  //     error: (error) => {
  //       // Manejar el error aquí
  //       console.error('Hubo un error al insertar el almacen', error);
  //     }
  //   });
  // }

  // abrirDeleteDialog(Id: number, Name: string) {
  //   const dialogRef = this.dialog.open(DeleteMenuComponent, {
  //     width: '550px',
  //     data: Name
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == "yes") {
  //       this.proveedoresService.deleteProveedor(Id).subscribe({
  //         next: (response) => {
  //           if(response.StatusCode == 200){
  //             this.toastr.success(response.response.data, 'Proveedores');
  //           } else {
  //             this.toastr.error(response.response.data,'Proveedores')
  //           }
  //           this.getData();
  //         },
  //         error: (error) => {
  //           console.error('Hubo un error al eliminar el almacén', error);
  //         }
  //       });
  //     }
  //   });
  // }

  // cargar(elemento:detallecomprasGetModel){
  //   this.Id = elemento.Id
  //   this.IdOrdenCompra = elemento.IdOrdenCompra
  //   this.Insumo = elemento.Insumo
  //   this.Cantidad = elemento.Cantidad
  //   this.CantidadRecibida=elemento.CantidadRecibida
  //   this.Costo=elemento.Costo
  //   this.CostoRenglon=elemento.CostoRenglon
  //   this.FechaRegistro=elemento.FechaRegistro
  //   this.FechaActualiza=elemento.FechaActualiza
  //   this.UsuarioActualiza=elemento.UsuarioActualiza
  //   this.Mensaje=elemento.Mensaje
  // }

  // limpiar(){
  //   this.Id = 0
  //   this.IdOrdenCompra = 0
  //   this.Insumo = 0
  //   this.Cantidad = 0
  //   this.CantidadRecibida=0
  //   this.Costo=0
  //   this.CostoRenglon=0
  //   this.FechaRegistro=0
  //   this.FechaActualiza=0
  //   this.UsuarioActualiza=""
  //   this.Mensaje=""
  // }

  // editar(){
  //   const persona:detallecoprasUpdateModel   = {
  //     id: this.Id,
  //     IdOrdenCompra: this.IdOrdenCompra,
  //     Insumo: this.Insumo,
  //     cantidad: this.Cantidad,
  //     CantidadRecibida: this.CantidadRecibida,
  //     Costo: this.Costo,
  //     CostoRenglon: this.CostoRenglon,
  //     usuarioActualiza: parseInt(this.loggedUser.Id,10) 
  //   };

  //   this.proveedoresService.updateProveedor(persona).subscribe({
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


