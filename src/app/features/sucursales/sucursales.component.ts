import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService,currentUser } from '../auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../../core/components/delete-menu/delete-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { SucursalesService } from '../../core/services/sucursales.service';
import { sucursalInsertModel, sucursalModel, sucursalUpdateModel } from '../../core/models/sucursales.model';


@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion','FechaReg','FechaAct', 'Usuario', 'Acciones'];
  dataSource: MatTableDataSource<sucursalModel>;

  id: number = 0;
  nombre: string = '';
  direccion: string = '';
  isModifying:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sucursalesService:SucursalesService, public dialog:MatDialog, public authService: AuthService, private toastr:ToastrService){
    this.dataSource = new MatTableDataSource<sucursalModel>()
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
    this.dataSource.filterPredicate = (data: sucursalModel, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) ||
             data.Id.toString().includes(filter) ||
             data.Direccion.toString().includes(filter)// Puedes añadir más campos si es necesario
    };
    this.sucursalesService.getSucursales().subscribe({
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
    const nuevaSucursal:sucursalInsertModel = {
      nombre: this.nombre,
      direccion: this.direccion,
      idUsuario: parseInt(this.loggedUser.Id,10)
    };

    console.log(nuevaSucursal)
    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.sucursalesService.insertarSucursal(nuevaSucursal).subscribe({
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
        this.sucursalesService.deleteSucursal(Id).subscribe({
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

  cargar(elemento:sucursalModel){
    this.id = elemento.Id
    this.nombre = elemento.Nombre
    this.direccion = elemento.Direccion
    this.isModifying = true
  }

  limpiar(){
    this.id = 0
    this.nombre = ''
    this.direccion = ''
    this.isModifying = false
  }

  editar(){
    const persona:sucursalUpdateModel = {
      id: this.id,
      nombre: this.nombre,
      direccion: this.direccion,
      idUsuario: parseInt(this.loggedUser.Id,10)
    };

    this.sucursalesService.updateSucursal(persona).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Proveedores');
        } else {
          this.toastr.error(response.response.data,'Proveedores')
        }
        console.log(response);
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
