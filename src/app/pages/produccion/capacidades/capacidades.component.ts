import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { CapacidadesService } from './capacidades.service';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';

import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ToastComponent } from 'src/app/Components/toast/toast.component';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-capacidades',
  templateUrl: './capacidades.component.html',
  styleUrls: ['./capacidades.component.css'],
})
export class CapacidadesComponent implements OnInit {
  @ViewChild('input', { static: false }) input!: ElementRef<HTMLInputElement>;
  dialog = inject(MatDialog);
  selectedProducto: string = '';
  selectedProductoDesc: string = '';
  selectedActividad: string = '';
  selectedOperario: string = '';
  selectedProceso: string = '';
  selectedProcesoId: number | null = null;
  selectedOperarioId: number | null = null;
  selectedActividadId: number | null = null;

  visibleRegistro: number = 1;
  visibleConsolidado: number = 0;
  visibleIniciarCronometro: number = 1;
  visibleDetenerCronometro: number = 0;

  procesos: any[] = [];
  actividad: any[] = [];
  operario: any[] = [];
  registros: any[] = [];
  producto: any[] = [];

  filteredOptions: any[] = [];
  filteredOptions2: any[] = [];
  filteredOptions3: any[] = [];
  filteredOptions4: any[] = [];
  params: any;

  today: string = '';
  consultor: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  duracion: string = '';
  comentariosTexto: string = '';
  searchTerm$ = new Subject<string>();

  constructor(
    private servicesCapacidades: CapacidadesService,
    private localStorageService: LocalStorageService
  ) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    var username = this.localStorageService.getItem('auth');
    this.consultor = username.name;

    this.getProcesos();
    this.getActividad();
    this.getOperarios();
    this.getRegistros();
    this.setupSearch();
  }

  verConsolidado(): void {
    this.visibleConsolidado = 1;
    this.visibleRegistro = 0;
  }

  verRegistro(): void {
    this.visibleRegistro = 1;
    this.visibleConsolidado = 0;
  }

  getProcesos(): void {
    this.servicesCapacidades.GetListProductSupplies().subscribe((response) => {
      this.procesos = response.value || [];
      this.filteredOptions2 = [...this.procesos];
    });
  }

  getActividad(): void {
    this.servicesCapacidades.GetListActividad().subscribe((response) => {
      this.actividad = response.value || [];
      this.filteredOptions = [...this.actividad];
    });
  }

  getOperarios(): void {
    this.servicesCapacidades.GetListOperario().subscribe((response) => {
      this.operario = response.value || [];
      this.filteredOptions3 = [...this.operario];
    });
  }

  getRegistros(): void {
    this.params = {
      name: this.consultor,
    };
    this.servicesCapacidades.GetRegistros(this.params).subscribe((response) => {
      this.registros = response.value || [];
    });
  }

  filter(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredOptions = this.actividad.filter((o: any) =>
      o.actividad.toLowerCase().includes(filterValue)
    );
  }

  filter2(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredOptions2 = this.procesos.filter((o: any) =>
      o.proceso.toLowerCase().includes(filterValue)
    );
  }

  filter3(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredOptions3 = this.operario.filter((o: any) =>
      o.nombreOperario.toLowerCase().includes(filterValue)
    );
  }

  setupSearch(): void {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        switchMap((term) =>
          this.servicesCapacidades.GetProductos({ producto: term })
        )
      )
      .subscribe((response: any) => {
        this.filteredOptions4 = response.value || [];
      });
  }

  filter4(value: string): void {
    this.searchTerm$.next(value);
  }

  iniciarCronometro(): void {
    const now = new Date();
    this.horaInicio = this.formatTime(now);
    this.visibleIniciarCronometro = 0;
    this.visibleDetenerCronometro = 1;
  }

  detenerCronometro(): void {
    const now = new Date();
    this.horaFin = this.formatTime(now);
    this.visibleDetenerCronometro = 0;
    this.visibleIniciarCronometro = 1;

    this.duracion = this.calcularDiferenciaHoras(this.horaInicio, this.horaFin);
    console.log(this.duracion);
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  formatHoraInicio(horaInicio: any): string {
    const hours = horaInicio.hours.toString().padStart(2, '0');
    const minutes = horaInicio.minutes.toString().padStart(2, '0');
    const seconds = horaInicio.seconds.toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  formatHoraFin(horaFin: any): string {
    const hours = horaFin.hours.toString().padStart(2, '0');
    const minutes = horaFin.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  calcularDiferenciaHoras(horaInicio: string, horaFin: string): string {
    if (!horaInicio || !horaFin) {
      return '00:00:00';
    }

    const [inicioHoras, inicioMinutos, inicioSegundos] = horaInicio.split(':').map(Number);
    const [finHoras, finMinutos, finSegundos] = horaFin.split(':').map(Number);

    const inicio = new Date(0, 0, 0, inicioHoras, inicioMinutos, inicioSegundos || 0);
    const fin = new Date(0, 0, 0, finHoras, finMinutos, finSegundos || 0);

    const diferencia = fin.getTime() - inicio.getTime();

    if (diferencia < 0) {
      return '00:00';
    }

    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return `${horas.toString().padStart(2, '0')}:${minutos
    .toString()
    .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  onOptionSelected(event: any): void {
    const selectedOption = this.procesos.find(
      (o: any) => o.proceso === event.option.value
    );
    if (selectedOption) {
      this.selectedProcesoId = selectedOption.id;
    }
  }
  onOptionSelected2(event: any): void {
    const selectedOption = this.operario.find(
      (o: any) => o.nombreOperario === event.option.value
    );
    if (selectedOption) {
      this.selectedOperarioId = selectedOption.id;
    }
  }
  onOptionSelected3(event: any): void {
    const selectedOption = this.actividad.find(
      (o: any) => o.actividad === event.option.value
    );
    if (selectedOption) {
      this.selectedActividadId = selectedOption.id;
    }
  }
  onOptionSelected4(event: any): void {
    console.log(event);
    const selectedOption = this.filteredOptions4.find(
      (o: any) => o.prd_codprd === event.option.value
    );
    console.log(selectedOption);
    if (selectedOption) {
      this.selectedProductoDesc = selectedOption.prd_desesp;
    }
  }

  saveRegistro() {
    if (
      this.selectedOperarioId == null ||
      this.selectedProcesoId == null ||
      this.selectedActividadId == null ||
      this.selectedProducto == '' ||
      this.horaInicio == '' ||
      this.horaFin == ''
    ) {
      alert('Completa todos los campos');
      return;
    }
    this.params = {
      codigoProducto: this.selectedProducto.trim(),
      nombreOperario: this.selectedOperarioId,
      descripcionProceso: this.selectedProcesoId,
      tarea: this.selectedActividadId,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      nombreConsultor: this.consultor,
      fecha: this.today,
      duracion: this.duracion,
      comentarios: this.comentariosTexto,
      nombreProducto: this.selectedProductoDesc.trim(),
    };

    this.servicesCapacidades.GetSave(this.params).subscribe((response) => {
      console.log(response);

      this.selectedProceso = '';
      this.selectedProductoDesc = '';
      this.selectedProcesoId = null;
      this.selectedOperario = '';
      this.selectedOperarioId = null;
      this.selectedActividad = '';
      this.selectedActividadId = null;
      this.selectedProducto = '';

      this.horaFin = '';
      this.horaInicio = '';
      this.duracion = '';

      this.comentariosTexto = '';

      this.getRegistros();
    });
  }

  formatDataForExport(data: any[]) {
    return data.map((item) => ({
      ...item,
      fecha: new Date(item.fecha).toLocaleDateString('es-ES'), // Formato de fecha: dd/mm/yyyy
      horaInicio: this.formatHoraInicio(item.horaInicio),
      horaFin: this.formatHoraFin(item.horaFin),
      duracion: this.formatHoraFin(item.duracion),
    }));
  }

  exportToExcel() {
    const formattedData = this.formatDataForExport(this.registros);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);

    const wb: XLSX.WorkBook = {
      Sheets: { Reporte: ws },
      SheetNames: ['Reporte'],
    };

    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
