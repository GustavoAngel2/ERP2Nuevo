import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { bancosService } from '../../core/services/bancos.service';
import { AuthService, currentUser } from '../auth/auth.service';
import { DeleteMenuComponent } from '../../core/components/delete-menu/delete-menu.component';
import { bancos, insertbancosModel, updatebancosModel } from '../../core/models/bancos.model';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class bancosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'nombre', 'Direccion',  'Acciones'];
  dataSource: MatTableDataSource<bancos>;

  id: number = 0;
  nombre: string = '';
  direccion: string = '';
  usuarioActualiza: string = '';
  isModifying: boolean = false;

  loggedUser: currentUser;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bancosService: bancosService,
    public dialog: MatDialog,
    public authService: AuthService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<bancos>();
    this.loggedUser = this.authService.getCurrentUser()
  }

  ngOnInit() {
    this.getData();
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

  getData() {
    this.bancosService.getBancos().subscribe({
      next: (response) => {
          this.dataSource.data = response.Response.data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  insertar(): void {
    const nuevobancos: insertbancosModel = {
      nombre: this.nombre,
      Direccion: this.direccion,
      UsuarioActualiza: parseInt(this.loggedUser.Id, 10)
    };

    this.bancosService.Insertarbancos(nuevobancos).subscribe({
      next: (response) => {
        if (response.StatusCode === 200) {
          this.toastr.success(response.response.data, 'Bancos');
        } else {
          this.toastr.error(response.response.data, 'Bancos');
        }
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        console.error('Hubo un error al insertar el banco', error);
      }
    });
  }

  abrirDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.bancosService.deletebancos(Id).subscribe({
          next: (response) => {
            if (response.StatusCode === 200) {
              this.toastr.success(response.response.data, 'Bancos');
            } else {
              this.toastr.error(response.response.data, 'Bancos');
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el banco', error);
          }
        });
      }
    });
  }

  cargarDatos(elemento: bancos) {
    this.id = elemento.Id;
    this.nombre = elemento.Nombre;
    this.direccion = elemento.Direccion;
    this.isModifying = true;
  }

  limpiar() {
    this.id = 0;
    this.nombre = '';
    this.direccion = '';
    this.isModifying = false;
  }

  editar() {
    const bancos: updatebancosModel = {
      Id: this.id,
      nombre: this.nombre,
      Direccion: this.direccion,
      UsuarioActualiza: parseInt(this.loggedUser.Id, 10)
    };

    this.bancosService.updatebancos(bancos).subscribe({
      next: (response) => {
        if (response.StatusCode === 200) {
          this.toastr.success(response.response.data, 'Bancos');
        } else {
          this.toastr.error(response.response.data, 'Bancos');
        }
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        console.error('Hubo un error al actualizar el banco', error);
      }
    });
  }
}
