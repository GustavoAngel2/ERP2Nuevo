import { Component, OnInit } from '@angular/core';
import { reportes } from '../data.service';
import { ReporteKardexMov, ReporteKardexMovSearch } from '../data-models/reportes.model';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

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

  dataSource: MatTableDataSource<ReporteKardexMov[]>;
  searchKardex:ReporteKardexMovSearch = {FechaInicio:'' , FechaFin: ''}
  constructor(private reportesService:reportes, private toastr:ToastrService){
    this.dataSource = new MatTableDataSource<ReporteKardexMov[]>();
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
            a.download = 'Reportes.xlsx'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.toastr.success("Descarga realizada!");
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
}
