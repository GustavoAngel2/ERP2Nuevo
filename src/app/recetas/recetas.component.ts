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
import { RecetasService } from '../data.service';
import { recetaModel,insertRecetaModel,updateRecetasModel } from '../data-models/recetas.model';
import { insertDetRecetaModel } from '../data-models/detallereceta.model';
import { DetalleRecetasService } from '../data.service';


@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {
  displayedColumns: string[] = [
    "Id",
    "IdReceta",
    "Insumo",
    "Descripcion",
    "Cantidad",
    "FechaReg",
    "FechaAct",
    "UsuarioAct",
    "Acciones"
  ];
  dataSource: MatTableDataSource<recetaModel>;
  Id: number = 0;
  Insumo:string ='';
  Cantidad:number =0;
  Nombre: string = '';
  FechaCreacion: string = '';
  FechaActualiza: string = '';
  isModifying:boolean = false;
  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recetasService: RecetasService,
    private detalleRecetas: DetalleRecetasService,
    public dialog:MatDialog, 
    public authService: AuthService, 
    private toastr:ToastrService
  ) {
    this.dataSource = new MatTableDataSource<recetaModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
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
    this.dataSource.filterPredicate = (data: recetaModel, filter: string) => {
      return data.Id.toString().toLowerCase().includes(filter) || 
             data.Nombre.toString().includes(filter)
    };
    this.detalleRecetas.getDetRecetas(this.Id).subscribe({
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
    const nuevaReceta: insertRecetaModel = {
      nombre: this.Nombre,   
      usuarioRegistra: parseInt(this.loggedUser.Id, 10),
      usuarioActualiza: parseInt(this.loggedUser.Id, 10)  
    };
  
    this.recetasService.insertarReceta(nuevaReceta).subscribe({
      next: (response) => {
        if (response.StatusCode == 200) {
          this.toastr.success(response.response.data, 'Recetas');
          
          // Obtener el Id de la receta insertada
          const recetaId = response.response.data; // Asume que el backend devuelve el Id insertado
          this.Id = recetaId;  // Asignamos el Id para usarlo en el formulario de detalle
  
          // Aquí podrías mostrar el formulario de detalle de receta o redirigir al usuario
          this.isModifying = true; // Mostrar el formulario de detalle con el nuevo Id
        } else {
          this.toastr.error(response.response.data, 'Recetas');
        }
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        console.error('Hubo un error al insertar la receta', error);
      }
    });
  }

  insertarDetalle(): void {
    const detalleReceta: insertDetRecetaModel = {
      IdReceta: this.Id,
      Insumo: this.Insumo,
      cantidad: this.Cantidad,
      usuarioActualiza: parseInt(this.loggedUser.Id, 10)
    };
  
    this.detalleRecetas.insertDetReceta(detalleReceta).subscribe({
      next: (response) => {
        if (response.StatusCode == 200) {
          this.toastr.success(response.response.data, 'Detalle Receta');
          this.limpiar(); // Limpia los campos si es necesario
        } else {
          this.toastr.error(response.response.data, 'Detalle Receta');
        }
      },
      error: (error) => {
        console.error('Error al insertar detalle receta', error);
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
        this.recetasService.deleteRecetas(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Recetas');
            } else {
              this.toastr.error(response.response.data,'Recetas')
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar la Receta', error);
          }
        });
      }
    });
  }

  editar(){
    const receta:updateRecetasModel  = {
      id: this.Id,
      nombre:this.Nombre,
      usuarioActualiza: parseInt(this.loggedUser.Id,10) 
    };

    this.recetasService.updateRecetas(receta).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Recetas');
        } else {
          this.toastr.error(response.response.data,'Recetas')
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


  cargar(elemento:recetaModel){
    this.Id = elemento.Id
    this.Nombre = elemento.Nombre
    this.isModifying = true
  }

  limpiar(){
    this.Nombre = ""
    this.isModifying = false
  }


}
