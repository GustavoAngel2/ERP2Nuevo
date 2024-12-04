import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { bancosService } from '../data.service';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService,currentUser } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { insertbancosModel, bancos, updatebancosModel,} from '../data-models/bancos.model';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrl: './bancos.component.css'
})
export class BancosComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion','FechaRegistro','FechaActualiza', 'UsuarioActualiza', 'Acciones'];
  dataSource: MatTableDataSource<bancos>;

  id: number = 0;
  nombre: string = '';
  direccion: string = '';
  usuarioActualiza: string ='';
  isModifying:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bancosService:bancosService, public dialog:MatDialog, public authService: AuthService, private toastr:ToastrService){
    this.dataSource = new MatTableDataSource<bancos>()
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
    this.dataSource.filterPredicate = (data: bancos, filter: string) => {
      return data.nombre.toLowerCase().includes(filter) ||
             data.Id.toString().includes(filter) ||
             data.Direccion.toString().includes(filter)// Puedes añadir más campos si es necesario
    };
    this.bancosService.getBancos().subscribe({
      next: (response) => {
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
    const nuevobancos:insertbancosModel = {
      nombre: this.nombre,
      Direccion: this.direccion,
      UsuarioActualiza: parseInt(this.loggedUser.Id,10)
    };

    console.log(nuevobancos)
    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.bancosService.Insertarbancos(nuevobancos).subscribe({
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
        this.bancosService.deletebancos(Id).subscribe({
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

  cargarDatos(elemento:bancos){
    this.id = elemento.Id
    this.nombre = elemento.nombre
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
    const bancos:updatebancosModel = {
      Id: this.id,
      nombre: this.nombre,
      Direccion: this.direccion,
      UsuarioActualiza: parseInt(this.loggedUser.Id,10)
    };

    this.bancosService.updatebancos(bancos).subscribe({
      next: (response) => {
        if (response.StatusCode === 200) {
          this.toastr.success(response.response.data, 'Proveedores');
        } else {
          this.toastr.error(response.response.data, 'Proveedores');
        }
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        console.error('Hubo un error al actualizar el banco', error);
      }
    });
  }
}
