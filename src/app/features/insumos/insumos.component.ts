import { unidadMedida } from '../../core/models/um.model';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { InsumosService,UMservice } from '../../core/services/data.service';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService,currentUser } from '../auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../../core/components/delete-menu/delete-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { insertInsumosModel,insumosModel,updateInsumosModel } from '../../core/models/insumos.model';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css'
})
export class InsumosComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'Descripcion','Costo', 'IUF', 'FechaRegistro', 'FechaActualiza', 'UsuarioActualiza', 'Acciones'];
  dataSource: MatTableDataSource<insumosModel>;

  id: number = 0;
  insumo: string = '';
  insumoUP: string= '';
  descripcionInsumo: string = '';
  costo: number = 0;
  idUnidadMedida: number = 0;
  usuarioActualiza: number = 0;
  isModifying:boolean = false;
  umList:unidadMedida[] = [];

  insumosFiltrados: insumosModel[] = [];
  descripcionFiltro: string = ''; // Nuevo campo para el filtro
  insumosPadresCombo:insumosModel[] = [];

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', NombrePersona: '' }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private unidadMedidaService:UMservice, private insumosService: InsumosService, public dialog:MatDialog, public authService: AuthService, private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource<insumosModel>(); // Inicializa dataSource como una instancia de MatTableDataSource
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
    this.dataSource.filterPredicate = (data: insumosModel, filter: string) => {
      return data.UsuarioActualiza.toLowerCase().includes(filter) ||
             data.Id.toString().includes(filter) ||
             data.FechaActualiza.toString().includes(filter)

    };

    this.unidadMedidaService.getUM().subscribe({
      next:(response) => {
        this.umList = response.Response.data
      }
    })

    this.insumosService.getInsumos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);

          this.dataSource.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
          this.insumosPadresCombo = response.Response.data;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertar():void {
    const nuevaPersona:insertInsumosModel = {
      insumo: this.insumo,
      descripcionInsumo: this.descripcionInsumo,
      costo: this.costo,
      unidadMedida: this.idUnidadMedida,
      usuarioActualiza: parseInt(this.loggedUser.Id,10),
      insumosUP: this.insumoUP
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.insumosService.insertarInsumo(nuevaPersona).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Proveedores');
        } else {
          this.toastr.error(response.response.data,'Proveedores')
        }
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  filtrarInsumos(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.insumosFiltrados = this.insumosPadresCombo.filter(insumo =>
      insumo.Descripcion.toLowerCase().includes(inputValue.toLowerCase())
    );
  }



  seleccionarInsumo(descripcion: string): void {
    const insumoSeleccionado = this.insumosPadresCombo.find(insumo => insumo.Descripcion === descripcion);
    if (insumoSeleccionado) {
      this.insumoUP = insumoSeleccionado.Insumo;
      this.descripcionInsumo = insumoSeleccionado.Descripcion;
    }
  }

  abrirDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.insumosService.deleteInsumo(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Proveedores');
            } else {
              this.toastr.error(response.response.data,'Proveedores')
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

  cargar(elemento:insumosModel){
    this.id = elemento.Id
    this.insumo = elemento.Insumo
    this.descripcionInsumo = elemento.Descripcion
    this.costo = elemento.Costo
    this.insumoUP = elemento.InsumosUP
    this.isModifying = true
  }

  limpiar(){
    this.id = 0
    this.insumo = ''
    this.descripcionInsumo = ''
    this.costo = 0
    this.isModifying = false
  }

  editar(){
    const persona:updateInsumosModel   = {
      id: this.id,
      insumo: this.insumo,
      descripcionInsumo: this.descripcionInsumo,
      costo: this.costo,
      unidadMedida: this.idUnidadMedida,
      insumosUP: this.insumoUP,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    };

    this.insumosService.updateInsumo(persona).subscribe({
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
}
