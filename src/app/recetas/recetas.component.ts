import { DetalleRecetasService } from './../data.service';
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
import { ArticulosService, RecetasService, InsumosService} from '../data.service';
import { recetaModel,insertRecetaModel,updateRecetasModel } from '../data-models/recetas.model';
import { insertDetRecetaModel, recetaDetModel } from '../data-models/detallereceta.model';
import { insumosModel } from '../data-models/insumos.model';
import Swal from 'sweetalert2';

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

  comboInsumo: insumosModel[] = [];

  dataSource: MatTableDataSource<recetaModel>;
  dataSource2: MatTableDataSource<recetaDetModel>;

  Id: number = 0;
  IdReceta: number = 0;
  Insumo:string = '0';
  Cantidad:number = 0;
  Nombre: string = '';
  FechaCreacion: string = '';
  FechaActualiza: string = '';


  insertReceta:boolean = true;
  insertDetalleReceta:boolean = false;
  editReceta:boolean = false;
  editDetalleReceta:boolean = false;
  viewReceta:boolean = false;


  viewDetail:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recetasService: RecetasService,
    private insumoService:InsumosService,
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
    this.insumoService.getInsumos().subscribe({
      next: (response) => {
          this.comboInsumo = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
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
            console.log(response)
            this.dataSource2.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
                console.log(response);
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
    this.recetasService.insertarReceta(nuevaReceta).subscribe({
      next: (response) => {
        if (response.StatusCode == 200) {
          this.toastr.success(response.response.data, 'Recetas');
          this.IdReceta = response.response.data;;

          // Llamar a getData() para cargar los detalles de la receta usando el IdReceta
          this.getData(this.IdReceta);  // Llamar con el IdReceta generado

          // Mostrar el formulario de detalle o cualquier otra acción que quieras hacer
          this.insertReceta = false;
          this.insertDetalleReceta = true;
        } else {
          console.log(response)
          Swal.fire("Ha ocurrido un error!", response.response.data, "error");
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
          this.toastr.success(response.response.data, 'Detalle receta');
          this.getData(this.IdReceta)
          this.limpiar(); // Limpia los campos si es necesario
        } else {
          Swal.fire("Ha ocurrido un error!", response.response.data, "error");
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
              Swal.fire("Ha ocurrido un error!", response.response.data, "error");
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

  abrirDeleteDetalleDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.detalleRecetas.deleteDetRecetas(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Detalle recetas');
            } else {
              Swal.fire("Ha ocurrido un error!", response.response.data, "error");
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
          Swal.fire("Ha ocurrido un error!", response.response.data, "error");
        }
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
    this.editReceta = true
  }

  limpiar(){
    this.Nombre = ""
    this.editReceta = false
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
          this.dataSource.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
        },
        error: (error) => {
          console.error(error);
        }
      });
    }



    mostrarDetalles(id: number) {
      this.getData(id); // Llama al método que obtiene los detalles del movimiento
    }


    volverALista() {
      
    }


    limpiarDetalle(){
      this.Insumo = '';
      this.Cantidad = 0;
    }
}
