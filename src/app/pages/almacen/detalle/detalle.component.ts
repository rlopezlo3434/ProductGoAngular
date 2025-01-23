import { Component } from '@angular/core';
import { ProductoDetalle } from 'src/app/Models/ProductoDetalle';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { DetalleService } from './detalle.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponentAlmacen {
  vistaFoto: boolean = false;

  params: any;
  insumos: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private detalleService: DetalleService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/productgo/home/marketing/almacen/detalle') {
          this.vistaFoto = false;
        } else {
          this.vistaFoto = true;
        }
      }
    });

    this.listarProductosSupplies();
  }

  listarProductosSupplies(): void {
    var localProduct = this.localStorageService.getItem('producto');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    this.spinner.show();

    console.log(localProduct.codigo);
    this.params = {
      cia: '01',
      year: currentYear.toString(),
      month: currentMonth, // month: currentMonth,
      product: localProduct.codigo, //product: 'VSX009500',
    };

    this.detalleService.GetListProductSupplies(this.params).subscribe(
      (data) => {
        console.log('data', data);
        const result = data
          .filter((insumo: ProductoDetalle) => insumo.area_codigo !== 'P')
          .reduce((acc: any[], insumo: any) => {
            const {
              cia,
              anio,
              mes,
              producto,
              secuencia,
              cantidad,
              ensamblador,
              ensamblador_nombre,
              estado,
              area_codigo,
              area_trabajo,
              flag_sin_insumos,
              obs,
              advertencia,
              canal_codigo,
              canal_nombre,
              cliente_codigo,
              cliente_nombre,
            } = insumo;

            // Busca si ya existe una entrada con esta combinación de atributos
            let item = acc.find(
              (i: any) => i.producto === producto && i.secuencia === secuencia
            );

            // Si no existe, crea un nuevo objeto para esta combinación y lo añade al acumulador
            if (!item) {
              item = {
                cia,
                anio,
                mes,
                producto,
                secuencia,
                cantidad,
                ensamblador,
                ensamblador_nombre,
                estado,
                area_codigo,
                area_trabajo,
                flag_sin_insumos,
                obs,
                advertencia,
                canal: [],
                cliente: [],
              };
              acc.push(item);
            }

            // Añadir el canal si no existe en el array de canales de este item
            if (
              !item.canal.some(
                (canal: any) => canal.canal_codigo === canal_codigo
              )
            ) {
              item.canal.push({
                canal_codigo,
                canal_nombre,
              });
            }

            // Añadir el cliente si no existe en el array de clientes de este item
            if (
              !item.cliente.some(
                (cliente: any) => cliente.cliente_codigo === cliente_codigo
              )
            ) {
              item.cliente.push({
                cliente_codigo,
                cliente_nombre,
              });
            }

            return acc;
          }, []);

        this.insumos = result;
        this.spinner.hide();
        console.log(this.insumos);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEstadoColorClass(estado: string): string {
    if (estado == '0') {
      return 'color-estado-0';
    } else {
      return 'color-estado-1';
    }
  }
  getEstadoInsumo(estado: number): string {
    if (estado == 0) {
      return 'color-insumo-0';
    } else {
      return 'color-insumo-1';
    }
  }
  verInsumo(insumo: ProductoDetalle): void {
    this.localStorageService.setItem('insumo', insumo);
    this.vistaFoto = true;
  }
}
