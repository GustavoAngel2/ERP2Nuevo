import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ProveedoresService } from '../data.service';
import { ProveedoresModel } from '../data-models/proveedores.model';
import { AuthService,currentUser } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'ApPaterno','ApMaterno','Direccion', 'FechaAct','FechaReg', 'Acciones'];
  dataSource: MatTableDataSource<ProveedoresModel>;
  id: number = 0;
  nombre: string = '';
  ApPaterno : string = '';
  ApMaterno : string = '';
  direccion: string = '';
  usuario: number = 0;
  isModifying:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private proveedoresService: ProveedoresService, public authService: AuthService) {
    this.dataSource = new MatTableDataSource<ProveedoresModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
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
    this.dataSource.filterPredicate = (data: ProveedoresModel, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
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

  // insertar():void {
  //   const nuevaPersona = {
  //     nombre: this.nombre,
  //     ApPaterno:this.ApPaterno,
  //     ApMaterno:this.ApMaterno,
  //     direccion: this.direccion,
  //     usuario: parseInt(this.loggedUser.Id,10) 
  //   };

  //   // Aquí asumo que tienes un método en tu servicio para insertar el departamento
  //   this.PersonasService.insertarPersona(nuevaPersona).subscribe({
  //     next: (response) => {
  //       // if(response.StatusCode == 200){
  //       //   this.toastr.success(response.response.data, 'Personas');
  //       // } else {
  //       //   this.toastr.error(response.response.data,'Personas')
  //       // }
  //       this.getData();
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
  //       this.PersonasService.deletePersonas(Id).subscribe({
  //         next: (response) => {
  //           if(response.StatusCode == 200){
  //             this.toastr.success(response.response.data, 'Personas');
  //           } else {
  //             this.toastr.error(response.response.data,'Personas')
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

  // cargar(elemento:ProveedoresModel){
  //   this.id = elemento.Id
  //   this.nombre = elemento.Nombre
  //   this.ApPaterno = elemento.ApPaterno
  //   this.ApMaterno = elemento.ApMaterno
  //   this.direccion = elemento.Direccion
  //   this.isModifying = true
  // }

  // limpiar(){
  //   this.id = 0
  //   this.nombre = ''
  //   this.ApPaterno = ''
  //   this.ApMaterno = ''
  //   this.direccion = ''
  //   this.isModifying = false
  // }

  // editar(){
  //   const persona:UpdatePersonasModel   = {
  //     Id: this.id,
  //     Nombre: this.nombre,
  //     ApPaterno:this.ApPaterno,
  //     ApMaterno:this.ApMaterno,
  //     Direccion: this.direccion,  
  //     Usuario: parseInt(this.loggedUser.Id,10)
  //   };

  //   this.PersonasService.updatePersonas(persona).subscribe({
  //     next: (response) => {
  //       // if(response.StatusCode == 200){
  //       //   this.toastr.success(response.response.data, 'Personas');
  //       // } else {
  //       //   this.toastr.error(response.response.data,'Personas')
  //       // }
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