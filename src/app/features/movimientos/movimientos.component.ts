import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonasService } from '../../core/services/personas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService,currentUser } from '../auth/auth.service';
import { MovModel, insertMovModel, updateMovModel } from '../../core/models/Movimiento.model';
import { DeleteMenuComponent } from '../../core/components/delete-menu/delete-menu.component';
import { ToastrService } from 'ngx-toastr';
import { SucursalesService } from '../../core/services/sucursales.service';
import { tipoMovimiento } from '../../core/services/movimientos.service';
import { DetMovimientosService } from '../../core/services/movimientos.service';
import { MovimientosService } from '../../core/services/movimientos.service';
import { DetMovInsertModel, DetMovGetModel } from '../../core/models/detallemovimiento.model';
import { InsumosService } from '../../core/services/insumos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css'
})
export class MovimientosComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    'Id',
    'NombreAlmacen',
    'TipoMovimiento',
    'UsuarioRegistra',
    'UsuarioAutoriza',
    'UsuarioActualiza',
    'FechaActualiza',
    'FechaCreacion',
    'FechaAutorizacion',
    'Acciones'
  ];
columnasDetalleCompras: string[] = [
  "Id",
  "IdMovimiento",
  "Insumo",
  "Descripcion",
  "Cantidad",
  "FechaRegistro",
  "FechaActualiza",
  "UsuarioActualiza",
  "Acciones"
]
/* ---------------------------------------------------------------------------------------------------------------------- */
  dataSource: MatTableDataSource<MovModel>;
  dataSource2: MatTableDataSource<DetMovGetModel>;
  Id:number=0;
  idAlmacen: number = 0;
  tipoMovimiento: number = 0;
  usuarioRegistra : number = 0;
  usuarioActualiza : number = 0;
  comboSuc: any[] = [];
  comboTM: any[] = [];
  comboInsumos: any[] = [];
  isModifying:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }


  isOnStepOne:boolean = true;
  isOnStepTwo:boolean = false;
  isOnDetail:boolean = false;
  mostrarFormulario: boolean = true;  // El formulario se muestra inicialmente


  IdMovimiento:number =0;
  Insumo: string="";
  cantidad:number=0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private PersonasService: PersonasService,
    public dialog:MatDialog,
    public authService: AuthService,
    private sucursalesService:SucursalesService,
    private TipoMov: tipoMovimiento,
    private movimientoService:MovimientosService,
    private detalleMovService: DetMovimientosService,
    private InsumosService:InsumosService,
    private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource<MovModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
    this.dataSource2 = new MatTableDataSource<DetMovGetModel>();
  }
/* ---------------------------------------------------------------------------------------------------------------------- */

  ngOnInit() {
    this.loggedUser = this.authService.getCurrentUser()
    this.getData()
    this.setCombos();
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
/* ---------------------------------------------------------------------------------------------------------------------- */
  setCombos(){
  this.sucursalesService.getSucursales().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
          this.comboSuc = response.Response.data;
          console.log('no contiene datos');
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.TipoMov.getTipoMov().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
          this.comboTM = response.Response.data;
          console.log('no contiene datos');
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.InsumosService.getInsumos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
          this.comboInsumos = response.Response.data;
          console.log('no contiene datos');

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

/* ---------------------------------------------------------------------------------------------------------------------- */
  getData(){
    this.dataSource.filterPredicate = (data: MovModel, filter: string) => {
      return data.NombreAlmacen.toLowerCase().includes(filter) ||
             data.Id.toString().includes(filter) ||
             data.TipoMovimiento.toLowerCase().includes(filter) ||
             data.UsuarioRegistra.toLowerCase().includes(filter) // Puedes añadir más campos si es necesario
    };
    this.movimientoService.getMovimiento().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
          this.dataSource.data = response.Response.data.Movimientos; // Asigna los datos al atributo 'data' de dataSource
          console.log('no contiene datos');

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getDetalle(id: number) {
    this.detalleMovService.getDetalleMov(id).subscribe({
      next: (response) => {
          this.dataSource2.data = response.Response.data;
      },
      error: (error) => {
        console.error('Error al obtener los detalles:', error);
      }
    });
  }



  /* --------------------------------------------------------------------------------------------------------------------- */
  mostrarDetalles(id: number) {
    this.IdMovimiento = id; // Almacena el ID del movimiento actual
    this.isOnStepOne = false; // Oculta la primera tabla
    this.isOnStepTwo = true; // Muestra la segunda tabla con detalles
    this.mostrarFormulario = false;  // Asegúrate de ocultar el formulario aquí
    this.getDetalle(id); // Llama al método que obtiene los detalles del movimiento
  }


  volverALista() {
    this.isOnStepOne = true;
    this.isOnStepTwo = false;
    this.mostrarFormulario = true;
  }

/* ---------------------------------------------------------------------------------------------------------------------- */
insertar(): void {
  const nuevoMov: insertMovModel = {
    idAlmacen: this.idAlmacen,
    tipoMovimiento: this.tipoMovimiento,
    usuarioActualiza: parseInt(this.loggedUser.Id, 10),
    usuarioAutoriza: parseInt(this.loggedUser.Id, 10),
    usuarioRegistra: parseInt(this.loggedUser.Id, 10)
  };

  this.movimientoService.InsertMovimiento(nuevoMov).subscribe({
    next: (response) => {
      if (response.StatusCode == 200) {
        console.log(response);
        this.toastr.success(response.message, 'Movimiento');
        this.isOnStepOne = false;
        this.isOnStepTwo = true;
        this.IdMovimiento = response.response.data;
        this.mostrarFormulario = true;  // Aquí asegúrate de mostrar el formulario de nuevo

        this.getData();
      } else {
        this.toastr.error(response.message, 'Movimiento');
      }
    },
    error: (error) => {
      console.error('Hubo un error al insertar el almacen', error);
    }
  });
}
/* -------------------------------------------------------------------------------------------------------------------------- */
exportarMovimiento() {
  this.movimientoService.ExportarMovimiento().subscribe(
      (response: Blob) => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          console.log("descargando");
          a.download = 'Movimientos.xlsx'; // Nombre del archivo a descargar
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      },
      error => {
          console.error('Error al exportar movimientos:', error);
      }
  );
}


/* ------------------------------------------------------------------------------------------------------------------------- */
insertarDetalleMov(){
  this.dataSource2.data = [];
  this.mostrarFormulario = true;
  const detalle:DetMovInsertModel = {
    IdMovimiento:this.IdMovimiento,
    insumo:this.Insumo,
    cantidad: this.cantidad,
    usuarioActualiza: parseInt(this.loggedUser.Id,10)
  }
  this.detalleMovService.InsertDetMovimiento(detalle).subscribe({
    next: (response) => {
      if (response.StatusCode == 200) {
      console.log(response)
      this.toastr.success(response.message, 'DetalleMovimiento');
      this.getDetalle(this.IdMovimiento)
    }else{
      this.toastr.error(response.message, 'DetalleMovimiento');
    }
  },
  error: (error) => {
    console.error(error)

    }
  })
}

terminar(){
  location.reload()
}

  /* ------------------------------------------------------------------------------------------------------------------- */
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

  limpiar(){
    this.Insumo = '';
    this.cantidad = 0;
  }
}

