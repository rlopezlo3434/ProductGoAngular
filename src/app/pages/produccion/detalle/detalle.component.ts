import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoDetalle } from 'src/app/Models/ProductoDetalle';
import { DetalleService } from './detalle.service';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent {
  vistaFoto: boolean = false;

  params: any;
  insumos: ProductoDetalle[] = [];
  productoPadre: any [] = [];

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
        const currentUrl = this.router.url;
        console.log('URL actual:', currentUrl);

        if (currentUrl.includes('/detalle') && !currentUrl.includes('/fotos')) {
          this.vistaFoto = false; // Vista principal de detalle
        } else {
          this.vistaFoto = true; // Subrutas como "fotos"
        }
        
        console.log('vistaFoto:', this.vistaFoto);
      }
    });

    this.listarProductosSupplies();

    this.listProductoPadre();
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
      product: localProduct.codigo ? localProduct.codigo : localProduct.cod_producto, //product: 'VSX009500',
    };

    this.detalleService.GetListProductSupplies(this.params).subscribe(
      (data) => {
        // this.insumos = data
        //   .filter((insumo: ProductoDetalle) => insumo.area_codigo === 'P') // Filtra por area_codigo
        //   .filter(
        //     (insumo: ProductoDetalle, index: number, self: ProductoDetalle[]) =>
        //       index === self.findIndex((i) => i.secuencia === insumo.secuencia)
        //   )
        //   .sort(
        //     (a: ProductoDetalle, b: ProductoDetalle) =>
        //       Number(a.secuencia) - Number(b.secuencia) // Ordena por secuencia de menor a mayor
        //   );
        const produccion = data.find(
          (insumo: ProductoDetalle) =>
            insumo.ensamblador_nombre === 'PRODUCCION'
        );

        this.insumos = data
          .filter((insumo: ProductoDetalle) => insumo.area_codigo === 'P')
          .filter(
            (insumo: ProductoDetalle) =>
              insumo.ensamblador_nombre === 'CONSUMOS EN PLANTA'
          )
          .map((insumo: ProductoDetalle) => {
            return {
              ...insumo,
              secuencia: [
                { secuencia: produccion?.secuencia }, // Agregar secuencia de PRODUCCION
                { secuencia: insumo.secuencia }, // Agregar la secuencia actual
              ],
              cantidad: [
                { cantidad: insumo.cantidad },
                { cantidad: produccion?.cantidad },
              ],
            };
          });
        const cantidades = {
          cantidadInsumo: this.insumos.map(
            (item: any) => item.cantidad[0].cantidad
          ),
          cantidadProduccion: this.insumos.map(
            (item: any) => item.cantidad[1].cantidad
          ),
        };
        localStorage.setItem('cantidades', JSON.stringify(cantidades));
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

  listProductoPadre(): void {
    var localProduct = this.localStorageService.getItem('producto');

    console.log(localProduct.codigo)

    this.params = {
      codigoProducto: localProduct.codigo ? localProduct.codigo : localProduct.cod_producto, //product: 'VSX009500',
    };

    this.detalleService.GetProductoPadre(this.params).subscribe((response) => {
      console.log(response)
      this.productoPadre = response;
    })
  }

  onProductoClick(codigo: string): void {
    console.log('Código seleccionado:', codigo);

    // Navegar a la misma página con el nuevo código en la URL
    this.router.navigate(['/productgo/home/marketing/imagenesFormula/detalle', codigo]).then(() => {
      // Recargar la página después de navegar
      window.location.reload();
    });
  }
}
