import { updateCantSinCargo } from '../../core/models/detalleentrada.model';
import { DetalleEntradasService } from '../../core/services/entradas.service';
import { ArticulosService } from '../../core/services/articulos.service';
import { ProveedoresService } from '../../core/services/proveedores.service';
import { SucursalesService } from '../../core/services/sucursales.service';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService,currentUser } from '../auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../../core/components/delete-menu/delete-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { EntradasService } from '../../core/services/entradas.service';
import { entradasModel } from '../../core/models/entradas.model';
import { detalleEntradaModel, insertDetalleEntradaModel } from '../../core/models/detalleentrada.model';
import { articulosModel } from '../../core/models/articulos.model';
import { getProveedoresModel } from '../../core/models/proveedores.model';
import { sucursalModel } from '../../core/models/sucursales.model';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    'Id',
    'Proveedor',
    'Factura',
    'Sucursal',
    'FechaEntrega',
    'FechaRegistro',
    'FechaActualiza',
    'UsuarioActualiza',
    'Acciones'
  ];
  displayedDetalColumns:string[] = [
    'Id',
    'IdEntrada',
    'Codigo',
    'Articulo',
    'Cantidad',
    'Costo',
    'Descuento',
    'MontoDescuento',
    'CantSinCargo',
    'Total',
    'FechaReg',
    'FechaAct',
    'UsuarioAct'
  ]

  dataSource: MatTableDataSource<entradasModel>;
  dataSourceDetalle: MatTableDataSource<detalleEntradaModel>;

  id: number = 0;
  idProveedor: number = 0;
  factura: string = '';
  idSurcursal: number = 0;
  usuarioActualiza: number = 0;

  idEntrada: number= 0;
  idDetalleEntrada:number = 0;
  cantSinCargos:number=0;
  codigo: string= '';
  cantidad: number= 0;
  costo: number= 0;
  descuento: number= 0;

  articulosList:articulosModel[] = [];
  proveedorList:getProveedoresModel[] = [];
  sucursalList:sucursalModel[]=[];

  idArticulo:number=0;

  fechaInicio:string = ''
  fechaFin:string = ''

  isOnStepOne:boolean = true;
  isOnStepTwo:boolean = false;
  mostrarFormulario:boolean = true;


  isModifying:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sucursalesService:SucursalesService,
    private proveedoresService:ProveedoresService,
    private articulosService:ArticulosService,
    private detalleEntradaService:DetalleEntradasService,
    private entradasService: EntradasService,
    public dialog:MatDialog,
    public authService: AuthService,
    private toastr:ToastrService
  ) {
    this.dataSource = new MatTableDataSource<entradasModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
    this.dataSourceDetalle = new MatTableDataSource<detalleEntradaModel>();
  }

  ngOnInit() {
    this.articulosService.getArticulos().subscribe({
      next:(response)=>{
        this.articulosList = response.Response.data
      },
      error:(err)=>{

      }
    })
    this.proveedoresService.getProveedores().subscribe({
      next:(response)=>{
        this.proveedorList = response.Response.data
      },
      error:(err)=>{

      }
    })
    this.sucursalesService.getSucursales().subscribe({
      next:(response)=>{
        this.sucursalList = response.Response.data
      },
      error:(err)=>{

      }
    })
    this.loggedUser = this.authService.getCurrentUser()
    this.getData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData(){
    this.dataSource.filterPredicate = (data: entradasModel, filter: string) => {
      return data.Factura.toString().toLowerCase().includes(filter) ||
             data.Id.toString().includes(filter) ||
             data.FechaEntrega.includes(filter) ||
             data.Surcursal.includes(filter)
    };
    this.entradasService.getEntradas().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.dataSource.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
        console.log(response)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getDetalleData(){
    this.detalleEntradaService.getDetalleEntrada(this.idEntrada).subscribe({
      next: (response) => {
        this.dataSourceDetalle.data = response.Response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertar():void {
    const nuevaEntrada = {
      idProveedor: this.idProveedor,
      factura: this.factura,
      idSurcursal: this.idSurcursal,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.entradasService.insertarEntrada(nuevaEntrada).subscribe({
      next: (response) => {
        this.idEntrada = response.response.data;
        this.isOnStepTwo = true;
        this.isOnStepOne = false;
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
        this.entradasService.deleteEntrada(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Entradas');
            } else {
              this.toastr.error(response.response.data,'Entradas')
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

  abrirDeleteDetalleDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.detalleEntradaService.deleteDetalleEntrada(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Entradas');
            } else {
              this.toastr.error(response.response.data,'Entradas')
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

  insertarDetalleEntrada(){
    const detalle:insertDetalleEntradaModel = {
      idEntrada:this.idEntrada,
      codigo:this.codigo,
      cantidad:this.cantidad,
      costo:this.costo,
      descuento:this.descuento,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    }
    this.detalleEntradaService.insertDetalleEntrada(detalle).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Entradas');
        } else {
          this.toastr.error(response.response.data,'Entradas')
        }
        this.getDetalleData();
        this.limpiar();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  limpiar(){
    this.id = 0
    this.idArticulo = 0;
    this.descuento = 0;
    this.cantidad = 0;
  }

  terminar(){
    location.reload();
  }

  onSelectChange(event:Event){
    const selectedId = +(event.target as HTMLSelectElement).value; // Convertimos a número
    const selectedItem = this.articulosList.find(item => item.Id === selectedId);
    if (selectedItem) {
      this.costo = parseInt(selectedItem.PrecioVenta,10);
      this.codigo = selectedItem.Codigo
    } else {
      this.costo = 0;
      this.codigo = '';
    }
  }

  mostrarDetalles(id: number) {
    this.idEntrada = id;
    this.isOnStepOne = false;
    this.isOnStepTwo = true;
    this.mostrarFormulario = false;
    this.getDetalleData();
  }


  volverALista() {
    this.isOnStepOne = true;
    this.isOnStepTwo = false;
    this.mostrarFormulario = true;
  }

  updateCantSinCargos(id:number){
    this.idDetalleEntrada = id;
    this.cantSinCargos = 0;
    this.isModifying = true;
  }

  cancelarCantSinCargo(){
    this.idDetalleEntrada = 0;
    this.cantSinCargos = 0;
    this.isModifying = false;
  }

  updateCantSinCargo(){
    const cant:updateCantSinCargo = {
      id:this.idDetalleEntrada,
      cantidad:this.cantSinCargos
    }
    this.detalleEntradaService.updateCatSinCargo(cant).subscribe({
      next:(response)=>{
        this.getDetalleData();
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data)
          this.cancelarCantSinCargo();
        }
        else{
          this.toastr.error(response.response.data)
          this.cancelarCantSinCargo();
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
