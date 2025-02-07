import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonasService } from '../../../core/services/data.service';
import { SucursalesService } from '../../../core/services/sucursales.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService, currentUser } from '../../auth/auth.service';
import { GetPersonasModel, InsertPersonasModel, UpdatePersonasModel } from '../../../core/models/personas.model';
import { DeleteMenuComponent } from '../../../core/components/delete-menu/delete-menu.component';
import { ToastrService } from 'ngx-toastr';
import { sucursalModel } from '../../../core/models/sucursales.model';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'ApPaterno','ApMaterno','Direccion', 'FechaAct','FechaReg', 'Acciones'];
  dataSource: MatTableDataSource<GetPersonasModel>;
  id: number = 0;
  idSucursal: number = 0;
  nombre: string = '';
  ApPaterno : string = '';
  ApMaterno : string = '';
  direccion: string = '';
  isModifying:boolean = false;

  sucursalesList:sucursalModel[] = []

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private PersonasService: PersonasService,
    public dialog:MatDialog,
    public authService: AuthService,
    private toastr:ToastrService,
    private sucursalesService:SucursalesService
  ) {
    this.dataSource = new MatTableDataSource<GetPersonasModel>();
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
    this.dataSource.filterPredicate = (data: GetPersonasModel, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) ||
             data.Id.toString().includes(filter) ||
             data.ApPaterno.toLowerCase().includes(filter) ||
             data.ApMaterno.toLowerCase().includes(filter) // Puedes añadir más campos si es necesario
    };
    this.PersonasService.getPersonas().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.dataSource.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
        console.log(response)

      },
      error: (error) => {
        console.error(error);
      }
    });

    this.sucursalesService.getSucursales().subscribe({
      next:(response)=>{
        this.sucursalesList = response.Response.data
      },
      error(err) {

      },
    })
  }
  insertar():void {
    const nuevaPersona:InsertPersonasModel = {
      Nombre: this.nombre,
      ApPaterno:this.ApPaterno,
      ApMaterno:this.ApMaterno,
      Direccion: this.direccion,
      Sucursal: this.idSucursal,
      Usuario: parseInt(this.loggedUser.Id,10)
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.PersonasService.insertarPersona(nuevaPersona).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Personas');
        } else {
          this.toastr.error(response.response.data,'Personas')
        }
        this.getData();
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
        this.PersonasService.deletePersonas(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Personas');
            } else {
              this.toastr.error(response.response.data,'Personas')
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

  cargar(elemento:GetPersonasModel){
    this.id = elemento.Id
    this.nombre = elemento.Nombre
    this.ApPaterno = elemento.ApPaterno
    this.ApMaterno = elemento.ApMaterno
    this.direccion = elemento.Direccion
    this.isModifying = true
  }

  limpiar(){
    this.id = 0
    this.nombre = ''
    this.ApPaterno = ''
    this.ApMaterno = ''
    this.direccion = ''
    this.isModifying = false
  }

  editar(){
    const persona:UpdatePersonasModel   = {
      Id: this.id,
      Nombre: this.nombre,
      ApPaterno:this.ApPaterno,
      ApMaterno:this.ApMaterno,
      Direccion: this.direccion,
      Usuario: parseInt(this.loggedUser.Id,10)
    };

    this.PersonasService.updatePersonas(persona).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Personas');
        } else {
          this.toastr.error(response.response.data,'Personas')
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

