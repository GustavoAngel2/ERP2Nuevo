import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService,currentUser } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { DetalleOrdenComprasService, InsumosService, OrdenComprasService, SucursalesService, UsusariosService } from '../data.service';
import { ProveedoresService } from '../data.service';
import { insertCompraModel, OrdenCompraModel, updateCompraModel } from '../data-models/orden-compra.model';
import { getProveedoresModel } from '../data-models/proveedores.model';
import { sucursalModel } from '../data-models/sucursales.model';
import { getUsuariosModel } from '../data-models/usuario.model';
import { insumosModel } from '../data-models/insumos.model';
import { detallecomprasGetModel, detallecomprasInsertModel } from '../data-models/detalleorden.model';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrl: './orden-compra.component.css'
})
export class OrdenCompraComponent implements OnInit, AfterViewInit{
  columnasCompas: string[] = [
    "Id",
    "Proveedor",
    "Sucursal",
    "FechaLlegada",
    "Comprador",
    "FechaRegistro",
    "Total",
    "UsuarioActualiza",
    "Acciones"
  ];
  columnasDetalleCompras: string[] = [
    "Id",
    "IdOrdenCompra",
    "Insumo",
    "Cantidad",
    "CantidadRecibida",
    "Costo",
    "CostoRenglon",
    "FechaRegistro",
    "FechaActualiza",
    "UsuarioActualiza",
    "Acciones"
  ]
  dataSource: MatTableDataSource<OrdenCompraModel>;
  dataSource2: MatTableDataSource<detallecomprasGetModel>;

  comboProveedores:getProveedoresModel[] = [];
  comboSucursales:sucursalModel[] = [];
  comboCompradores:getUsuariosModel[] = [];
  comboInsumos:insumosModel[] = [];

  id: number = 0;
  idProveedor: number = 0;
  fechaLlegada: string = '';
  idSucursal: number = 0;
  idComprador: number = 0;

  idOrdenCompra : number = 0
  insumo: string = ''
  cantidad: number = 0
  usuarioActualiza: number = 0;

  isModifying:boolean = false;
  isOnStepOne:boolean = true;
  isOnStepTwo:boolean = false;
  isOnDetail:boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private proveedoresService:ProveedoresService, 
    private ordenCompraService: OrdenComprasService, 
    private sucursalesService:SucursalesService,
    private usuariosService:UsusariosService,
    private detalleOrdenCompraService:DetalleOrdenComprasService,
    private insumosService:InsumosService,
    public dialog:MatDialog, 
    public authService: AuthService, 
    private toastr:ToastrService
  ) {
    this.dataSource = new MatTableDataSource<OrdenCompraModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
    this.dataSource2 = new MatTableDataSource<detallecomprasGetModel>();
  }

  ngOnInit() {
    this.loggedUser = this.authService.getCurrentUser()
    this.setCombos();
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



  setCombos(){

    this.proveedoresService.getProveedores().subscribe({
      next: (response) => {
          this.comboProveedores = response.Response.data;
          console.log('no contiene datos');
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.sucursalesService.getSucursales().subscribe({
      next: (response) => {
          this.comboSucursales = response.Response.data;
          console.log('no contiene datos');
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
          this.comboCompradores = response.Response.data;
          console.log('no contiene datos');
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.insumosService.getInsumos().subscribe({
      next: (response) => {
          this.comboInsumos = response.Response.data;
          console.log('no contiene datos');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getData(){
    this.dataSource.filterPredicate = (data: OrdenCompraModel, filter: string) => {
      return data.Id.toString().toLowerCase().includes(filter) || 
      data.IdComprador.toString().includes(filter)|| 
      data.IdProveedor.toString().includes(filter)
    };
    this.ordenCompraService.getOrdenCompras().subscribe({
      next: (response) => {
          this.dataSource.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
          console.log('no contiene datos');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertarOrden():void {
    const nuevaPersona: insertCompraModel = {
      id: this.id,
      fechaLlegada:this.fechaLlegada,
      idComprador: this.idComprador,
      idSucursal: this.idSucursal,
      idProveedor: this.idProveedor,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)  
    }

    console.log(nuevaPersona)

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.ordenCompraService.insertarOrdenCompra(nuevaPersona).subscribe({
      next: (response) => {
        this.idOrdenCompra = response.response.data
        this.limpiar();
        this.isOnStepOne = false;
        this.isOnStepTwo = true;
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
        this.ordenCompraService.deleteOrdenCompra(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Orden compra');
            } else {
              this.toastr.error(response.response.data,'Orden compra')
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

  cargar(elemento:OrdenCompraModel){
    this.id = elemento.Id
    this.idComprador = elemento.IdComprador
    this.idProveedor = elemento.IdProveedor
    this.idSucursal = elemento.IdSucursal
    this.fechaLlegada = elemento.FechaLegada
    this.isModifying = true
  }

  limpiar(){
    this.id = 0
    this.idComprador = 0
    this.idProveedor = 0
    this.idSucursal = 0
    this.fechaLlegada = ''
    this.isModifying = false
  }

  editar(){
    const persona:updateCompraModel  = {
      id: this.id,
      idComprador:this.idComprador,
      idProveedor:this.idProveedor,
      idSucursal:this.idSucursal,
      fechaLlegada:this.fechaLlegada,
      usuarioActualiza: parseInt(this.loggedUser.Id,10) 
    };
    console.log(persona)
    this.ordenCompraService.updateOrdenCompra(persona).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Proveedores');
        } else {
          this.toastr.error(response.response.data,'Proveedores')
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
  getDetalle(id:number){
    this.detalleOrdenCompraService.getDetalleOrdenCompras(id).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
          this.dataSource2.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSourc  
          console.log('no contiene datos')
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertarDetalleOrden(){
    const detalle:detallecomprasInsertModel = {
      idOrdenCompra:this.idOrdenCompra,
      insumo:this.insumo,
      cantidad: this.cantidad,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    }
    this.detalleOrdenCompraService.insertarDetalleOrdenCompra(detalle).subscribe({
      next: (response) => {
        console.log(response)
        this.getDetalle(this.idOrdenCompra)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  terminar(){
    location.reload()
  }
}
