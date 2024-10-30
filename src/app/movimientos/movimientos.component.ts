import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonasService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService,currentUser } from '../auth.service';
import { GetPersonasModel, InsertPersonasModel, UpdatePersonasModel } from '../data-models/personas.model';
import { MovModel,insertMovModel,updateMovModel } from '../data-models/Movimiento.model';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { ToastrService } from 'ngx-toastr';
import { SucursalesService } from '../data.service';
import { tipoMovimiento } from '../data.service';
import { DetMovimientosService } from '../data.service';
import { MovimientosService } from '../data.service';
import { DetMovGetModel, DetMovInsertModel } from '../data-models/detallemovimiento.model';
import { InsumosService } from '../data.service';


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
        if (response && Array.isArray(response)&&response.length>0) {
          this.comboSuc = response;
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.TipoMov.getTipoMov().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response)&&response.length>0) {
          this.comboTM = response;
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.InsumosService.getInsumos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response)&&response.length>0) {
          this.comboInsumos = response;
          console.log(this.comboInsumos)
        } else {
          console.log('no contiene datos');
        }
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
        if (response && Array.isArray(response)&&response.length>0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
          console.log(response)
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getDetalle(id: number) {
    this.dataSource2.data = [];  // Limpia los datos antiguos antes de cargar nuevos
    this.mostrarFormulario = false;  // Oculta el formulario de inserción
    this.detalleMovService.getDetalleMov(id).subscribe({
      next: (response) => {
        console.log('Detalles del movimiento:', response);
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource2.data = response;  // Actualiza la tabla de detalles
        } else {
          console.log('No hay detalles disponibles.');
          this.dataSource2.data = [];  // Limpia los datos si no hay detalles
        }
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
  }/* -------------------------------------------------------------------------------------------------------------------- */

/*   cargar(elemento:GetPersonasModel){
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
 */
/*   editar(){
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
  } */
}

