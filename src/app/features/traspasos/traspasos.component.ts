import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DetalleTraspasosService } from '../../core/services/traspasos.service';
import { InsumosService } from '../../core/services/insumos.service';
import { SucursalesService } from '../../core/services/sucursales.service';
import { TraspasosService } from '../../core/services/traspasos.service';
import { UsusariosService } from '../../core/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService,currentUser } from '../auth/auth.service';
import { DeleteMenuComponent } from '../../core/components/delete-menu/delete-menu.component';
import { ToastrService } from 'ngx-toastr';
import { getTraspasosModel, insertTraspasoModel, traspasoModel } from '../../core/models/traspasos.model';
import { sucursalModel } from '../../core/models/sucursales.model';
import { getUsuariosModel } from '../../core/models/usuario.model';
import { insumosModel } from '../../core/models/insumos.model';
import { detalleTraspasoModel, insertDetalleTraspasoModel, updateDetalleTraspasoModel } from '../../core/models/detalletraspaso.model';

@Component({
  selector: 'app-traspasos',
  templateUrl: './traspasos.component.html',
  styleUrl: './traspasos.component.css'
})
export class TraspasosComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    'Id',
    'AlmacenOrigen',
    'AlmacenDestino',
    'UsuarioEnvia',
    'UsuarioRecibe',
    'UsuarioActualiza',
    'FechaAct',
    'FechaReg',
    'Acciones'
  ];

  displayedColumns2: string[] = [
    'Id',
    'IdTraspaso',
    'Insumo',
    'CantidadEnviada',
    'CantidadRecibida',
    'FechaRegistro',
    'FechaActualiza',
    'UsuarioActualiza',
    'Acciones'
  ]

  dataSource: MatTableDataSource<traspasoModel>;
  dataSource2: MatTableDataSource<detalleTraspasoModel>;

  id: number = 0;
  almacenOrigen: number = 0;
  almacenDestino : number = 0;
  usuarioEnvia : number = 0;

  idTraspaso: number = 0;
  insumo: string = '';
  cantidadEnviada: number = 0;
  cantidadRecivida:number = 0
  usuarioActualiza: number = 0;

  isModifying:boolean = false;

  search:getTraspasosModel = {
    pAlmacenDestino: 0,
    pAlmacenOrigen: 0,
    pFechaInicio: "2024-01-01",
    pFechaFinal: "2025-01-01"
  }

  isOnStepOne:boolean = true;
  isOnStepTwo:boolean = false;

  mostrarFormulario:boolean = true;

  comboSucursales:sucursalModel[] = [];
  comboUsuarios:getUsuariosModel[] = [];
  comboInsumos:insumosModel[] = [];

  loggedUser: currentUser;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private traspasosService: TraspasosService,
    private detalleTraspasoService: DetalleTraspasosService,
    private sucursalesServise: SucursalesService,
    private usuariosService: UsusariosService,
    private insumosService: InsumosService,
    public dialog:MatDialog,
    public authService: AuthService,
    private toastr:ToastrService
  )
  {
    this.dataSource = new MatTableDataSource<traspasoModel>();
    this.dataSource2 = new MatTableDataSource<detalleTraspasoModel>();
    this.loggedUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.search.pFechaInicio = this.dateNow();
    this.search.pFechaFinal = this.dateNow();
    this.setCombos();
    this.getData();
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
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  setCombos(){
    this.sucursalesServise.getSucursales().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);

          this.comboSucursales = response.Response.data; // Asigna los datos al atributo 'data' de dataSource




      },
      error: (error) => {
        console.error(error);
      }
    });
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
          this.comboUsuarios = response.Response.data; // Asigna los datos al atributo 'data' de dataSource

      },
      error: (error) => {
        console.error(error);
      }
    });
    this.insumosService.getInsumos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
          this.comboInsumos = response.Response.data; // Asigna los datos al atributo 'data' de dataSource

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getData(){
    this.dataSource.filterPredicate = (data: traspasoModel, filter: string) => {
      return data.UsuarioActualiza.toLowerCase().includes(filter) ||
             data.Id.toString().includes(filter)
    };
    this.traspasosService.getTraspasos(this.search).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);

          this.dataSource.data = response.Response.data;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getDetalleData(){
    this.detalleTraspasoService.getDetalleTraspaso(this.idTraspaso).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
          this.dataSource2.data = response.Response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertar():void {
    const nuevaPersona:insertTraspasoModel = {
      idAlmacenOrigen: this.almacenOrigen,
      idAlmacenDestino: this.almacenDestino,
      usuarioEnvia: parseInt(this.loggedUser.Id,10) ,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.traspasosService.insertTraspaso(nuevaPersona).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.msg, 'Traspasos');
          this.idTraspaso = response.response.data;
          this.isOnStepOne = false;
          this.isOnStepTwo = true;
        } else {
          this.toastr.error(response.response.msg,'Traspasos')
        }
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  insertarDetalle():void {
    const nuevaPersona:insertDetalleTraspasoModel = {
      idTraspaso: this.idTraspaso,
      cantidadEnviada: this.cantidadEnviada,
      insumo: this.insumo,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.detalleTraspasoService.insertDetalleTraspaso(nuevaPersona).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Traspasos');
          this.limpiar();
        } else {
          this.toastr.error(response.response.data,'Traspasos')
        }
        this.getDetalleData();
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
        this.traspasosService.deleteTraspaso(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Traspasos');
            } else {
              this.toastr.error(response.response.data,'Traspasos')
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

  abrirDetalleDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.detalleTraspasoService.deleteDetalleTraspaso(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Traspasos');
            } else {
              this.toastr.error(response.response.data,'Traspasos')
            }
            this.getDetalleData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });
      }
    });
  }

  cargar(elemento:detalleTraspasoModel){
    this.id = elemento.Id;
    this.idTraspaso = elemento.IdTraspaso;
    this.insumo = elemento.Insumo.toString();
    this.cantidadEnviada = elemento.CantidadEnviada;
    this.cantidadRecivida = elemento.CatidadRecibida;
    this.isModifying = true;
  }

  limpiarEdit(){
    this.cantidadEnviada = 0
    this.cantidadRecivida = 0
    this.insumo = ''
    this.isModifying=false;
  }

  limpiar(){
    this.cantidadEnviada = 0
    this.insumo = ''
  }

  dateNow():string{
    const fecha = new Date();
    return `${String(fecha.getFullYear())}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
  }

  terminar(){
    location.reload()
  }

  mostrarDetalles(id: number) {
    this.idTraspaso = id; // Almacena el ID del movimiento actual
    this.isOnStepOne = false; // Oculta la primera tabla
    this.isOnStepTwo = true; // Muestra la segunda tabla con detalles
    this.mostrarFormulario = false;  // Asegúrate de ocultar el formulario aquí
    this.getDetalleData(); // Llama al método que obtiene los detalles del movimiento
  }

  volverALista() {
    this.isOnStepOne = true;
    this.isOnStepTwo = false;
    this.mostrarFormulario = true
  }

  cancelar(){
    this.limpiarEdit();
  }

  updateDetalleTraspaso(){
    const det:updateDetalleTraspasoModel = {
      id: this.id,
      insumo: this.insumo,
      cantidadEnviada: this.cantidadEnviada,
      cantidadRecibida: this.cantidadRecivida,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    }
    this.detalleTraspasoService.updateDetalleTraspaso(det).subscribe({
      next:(response)=>{
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Traspasos');
          this.limpiarEdit();
          this.cancelar();
        } else {
          this.toastr.error(response.response.data,'Traspasos')
        }
        this.getDetalleData();
      },
      error:(err)=>{

      }
    })
  }
}

