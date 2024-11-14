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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion','Telefono','IdBanco', 'PlazoPago','Correo', 'RFC', 'RazonSocial', 'CLABE', 'FechaRegistro', 'FechaActualiza', 'UsuarioActualiza', 'Acciones'];
  dataSource: MatTableDataSource<getProveedoresModel>;

  id: number = 0;
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  idBanco: number = 0;
  plazoPago: number= 0;
  correo: string = '';
  rfc: string = '';
  razonSocial: string = '';
  clabe: string = '';
  isModifying:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private proveedoresService: ProveedoresService, public dialog:MatDialog, public authService: AuthService, private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource<getProveedoresModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
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
    this.dataSource.filterPredicate = (data: getProveedoresModel, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter) ||
             data.Telefono.toString().includes(filter)// Puedes añadir más campos si es necesario
    };
    this.proveedoresService.getProveedores().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response)&&response.length>0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertar():void {
    const nuevaPersona = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      idBanco: this.idBanco,
      plazoPago: this.plazoPago,
      correo: this.correo,
      rfc: this.rfc,
      razonSocial: this.razonSocial,
      clabe: this.clabe,
      usuarioActualiza: parseInt(this.loggedUser.Id,10) 
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.proveedoresService.insertarProovedor(nuevaPersona).subscribe({
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
    Swal.fire({
      title: `¿Estás seguro que desea borrar ${Name}?`,
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedoresService.deleteProveedor(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              Swal.fire('Eliminado', 'El archivo ha sido eliminado', 'success');
            } else {
              Swal.fire('Error', 'Ha ocurrido un error!', 'error');
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });
      }
    });

    // const dialogRef = this.dialog.open(DeleteMenuComponent, {
    //   width: '550px',
    //   data: Name
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == "yes") {
    //     this.proveedoresService.deleteProveedor(Id).subscribe({
    //       next: (response) => {
    //         if(response.StatusCode == 200){
    //           this.toastr.success(response.response.data, 'Proveedores');
    //         } else {
    //           this.toastr.error(response.response.data,'Proveedores')
    //         }
    //         this.getData();
    //       },
    //       error: (error) => {
    //         console.error('Hubo un error al eliminar el almacén', error);
    //       }
    //     });
    //   }
    // });
  }

  cargar(elemento:getProveedoresModel){
    this.id = elemento.Id
    this.nombre = elemento.Nombre
    this.direccion = elemento.Direccion
    this.telefono = elemento.Telefono
    this.idBanco=elemento.IdBanco
    this.plazoPago=elemento.PlazoPago
    this.correo=elemento.Correo
    this.rfc=elemento.RFC
    this.razonSocial=elemento.RazonSocial
    this.clabe=elemento.CLABE
    this.isModifying = true
  }

  limpiar(){
    this.id = 0
    this.nombre = ''
    this.direccion = ''
    this.telefono = ''
    this.idBanco=0
    this.plazoPago=0
    this.correo=''
    this.rfc=''
    this.razonSocial=''
    this.clabe=''
    this.isModifying = false
  }

  editar(){
    const persona:updateProveedorModel   = {
      id: this.id,
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      idBanco: this.idBanco,
      plazoPago: this.plazoPago,
      correo: this.correo,
      rfc: this.rfc,
      razonSocial: this.razonSocial,
      clabe: this.clabe,
      usuarioActualiza: parseInt(this.loggedUser.Id,10) 
    };

    this.proveedoresService.updateProveedor(persona).subscribe({
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