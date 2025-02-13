import { DetalleEntradasService } from '../../core/services/entradas.service';
import { Component, OnInit } from '@angular/core';
import { reportes } from '../../core/services/reportes.service';
import { ReporteKardexMov, ReporteKardexMovSearch } from '../../core/models/reportes.model';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { getReportEntradas, getReportEntradasSearch } from '../../core/models/detalleentrada.model';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  displayedColumns:string[] = [
    'Id',
    'Movimiento_Ligado',
    'TipoMovimiento',
    'Sucursal',
    'Insumo',
    'Cantidad',
    'Estatus',
    'UsuarioActualiza',
    'FechaRegistro',
    'FechaActualiza'
  ]

  displayedColumnsEntradas:string[] = [
    'Id',
    'Entrada_Ligada',
    'Codigo',
    'NombreProveedor',
    'NombreSucursal',
    'Cantidad',
    'Costo',
    'Descuento',
    'MontoDescuento',
    'CantidadSinCargo',
    'Total',
    'Estatus',
    'FechaRegistro',
    'FechaActualiza'
  ]

  dataSource: MatTableDataSource<ReporteKardexMov[]>;
  dataSourceDetalle:MatTableDataSource<getReportEntradas[]>;
  searchKardex:ReporteKardexMovSearch = {FechaInicio:'' , FechaFin: ''}
  searchEntradas:getReportEntradasSearch = {FechaInicio:'' , FechaFinal: ''}
  constructor(private detEntradasService:DetalleEntradasService, private reportesService:reportes, private toastr:ToastrService){
    this.dataSource = new MatTableDataSource<ReporteKardexMov[]>();
    this.dataSourceDetalle = new MatTableDataSource<getReportEntradas[]>();
  }

  getData(){
    this.reportesService.getKardex(this.searchKardex).subscribe({
      next:(response) => {
        this.dataSource.data = response

      },
      error:(err) => {
        console.log(err)
      }
    })
  }
  exportarReporte() {
    this.reportesService.ExportarReporte().subscribe(
        (response: Blob) => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            this.toastr.info("descargando");
            a.download = 'Reportes Movimientos.xlsx'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.toastr.success("peticion de descarga realizada!");
        },
        error => {
            Swal.fire('Error al exportar movimientos:', error,'error');
        }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEntradas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDetalle.filter = filterValue.trim().toLowerCase();
  }

  exportarEntradas() {
    this.detEntradasService.ExportarReporte().subscribe(
        (response: Blob) => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            this.toastr.info("descargando");
            a.download = 'Reportes Entradas.xlsx'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.toastr.success("peticion de descarga realizada!");
        },
        error => {
            console.error('Error al exportar movimientos:', error);
        }
    );
  }

  getDataEntradas(){
    this.detEntradasService.getDetalleEntradaReport(this.searchEntradas).subscribe({
      next:(response)=>{
        this.dataSourceDetalle.data = response
      },
      error:(err) =>{
        console.error(err)
      }
    })
  }

}
