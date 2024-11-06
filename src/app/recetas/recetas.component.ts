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
import { ArticulosService, RecetasService } from '../data.service';
import { recetaModel,insertRecetaModel,updateRecetasModel } from '../data-models/recetas.model';
import { insertDetRecetaModel, recetaDetModel, updateDetRecetasModel } from '../data-models/detallereceta.model';
import { DetalleRecetasService } from '../data.service';
import { articulosModel } from '../data-models/articulos.model';


@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent implements OnInit,AfterViewInit{
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

  displayedColumns2: string[] = [
    "Id",
    "Nombre",
    "FechaCreacion",
    "FechaActualiza",
    "UsuarioRegistra",
    "UsuarioActualiza",
    "Acciones"
  ];

  comboArticulos: articulosModel[] = [];

  dataSource: MatTableDataSource<recetaModel>;
  dataSource2: MatTableDataSource<recetaDetModel>;
  
  Id: number = 0;
  IdReceta: number = 0;
  Insumo:string = '0';
  Cantidad:number =0;
  Nombre: string = '';
  FechaCreacion: string = '';
  FechaActualiza: string = '';

  isOnStepOne:boolean = true;
  isOnStepTwo:boolean = false;
  isModifying:boolean = false;
  
  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recetasService: RecetasService,
    private articulosService:ArticulosService,
    private detalleRecetas: DetalleRecetasService,
    public dialog:MatDialog, 
    public authService: AuthService, 
    private toastr:ToastrService
  ) {
    this.dataSource = new MatTableDataSource<recetaModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
    this.dataSource2 = new MatTableDataSource<recetaDetModel>();
  }


  ngOnInit() {
    this.loggedUser = this.authService.getCurrentUser();
    this.setCombos();
    this.getDataRecetas();
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

  setCombos(){
    this.articulosService.getArticulos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response) && response.length > 0) {
          console.log(response)
          this.comboArticulos = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log('No contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getData(id:number): void {
    // Configura el filtro de búsqueda si es necesario
    this.dataSource.filterPredicate = (data: recetaModel, filter: string) => {
      return data.Id.toString().toLowerCase().includes(filter) || 
             data.Nombre.toString().includes(filter);
    };
  
    // Asegúrate de que se esté utilizando el IdReceta correcto al obtener los detalles
      this.detalleRecetas.getDetRecetas(id).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response); 
          if (response && Array.isArray(response) && response.length > 0) {
            console.log(response)
            this.dataSource2.data = response; // Asigna los datos al atributo 'data' de dataSource
          } else {
            console.log('No contiene datos');
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } 
  
  


  insertar(): void {
    const nuevaReceta: insertRecetaModel = {
      nombre: this.Nombre,
      usuarioRegistra: parseInt(this.loggedUser.Id, 10),
      usuarioActualiza: parseInt(this.loggedUser.Id, 10)
    };
    console.log(nuevaReceta)
    this.recetasService.insertarReceta(nuevaReceta).subscribe({
      next: (response) => {
        if (response.StatusCode === 200) {
          this.toastr.success(response.response.msg, 'Recetas');
 
          this.IdReceta = response.response.data;;  

          // Llamar a getData() para cargar los detalles de la receta usando el IdReceta
          this.getData(this.IdReceta);  // Llamar con el IdReceta generado
  
          // Mostrar el formulario de detalle o cualquier otra acción que quieras hacer
          this.isOnStepOne = false;
          this.isOnStepTwo = true;
        } else {
          this.toastr.error(response.response.msg, 'Recetas');
        }
        this.limpiar();
      },
      error: (error) => {
        console.error('Hubo un error al insertar la receta', error);
      }
    });
  }
  

  insertarDetalle(): void {
    const detalleReceta: insertDetRecetaModel = {
      idReceta: this.IdReceta,
      insumo: this.Insumo,
      cantidad: this.Cantidad,
      usuarioActualiza: parseInt(this.loggedUser.Id, 10)
    };
    console.log(detalleReceta)
    this.detalleRecetas.insertDetReceta(detalleReceta).subscribe({
      next: (response) => {
        if (response.StatusCode == 200) {
          this.toastr.success(response.response.data, 'Detalle Receta');
          this.getData(this.IdReceta)
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
            this.getData(this.IdReceta);
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
        this.getData(this.IdReceta);
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

  terminar(){
    location.reload()
  }

  getDataRecetas(): void {
    // Configura el filtro de búsqueda si es necesario
    this.dataSource.filterPredicate = (data: recetaModel, filter: string) => {
      return data.Id.toString().toLowerCase().includes(filter) || 
             data.Nombre.toString().includes(filter);
    };
  
    // Asegúrate de que se esté utilizando el IdReceta correcto al obtener los detalles
      this.recetasService.getRecetas().subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response); 
          if (response && Array.isArray(response) && response.length > 0) {
            console.log(response)
            this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
          } else {
            console.log('No contiene datos');
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } 
}
