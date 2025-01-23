import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenesProdService } from './imagenes-prod.service';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PartesService } from '../partes/partes.service';

@Component({
  selector: 'app-imagenes-prod',
  templateUrl: './imagenes-prod.component.html',
  styleUrls: ['./imagenes-prod.component.css'],
})
export class ImagenesProdComponent {
  vistaDetalle: boolean = false;
  params: any;
  productos: any[] = []; // Lista original de productos
  filteredProductos: any[] = []; // Lista filtrada de productos

  searchTerm: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private imagenService: ImagenesProdService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private productoParte: PartesService
  ) {}

  ngOnInit(): void {
    this.listarProductos();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/productgo/home/marketing/imagenesFormula') {
          this.vistaDetalle = false;
        } else {
          this.vistaDetalle = true;
        }
      }
    });
  }

  filterProductos(): void {
    if (this.searchTerm) {
      var searchTermLower = this.searchTerm.toLowerCase();
      console.log(searchTermLower);
      // Filtra la lista de productos según el valor en searchTerm
      this.filteredProductos = this.productos.filter((product) =>
        product.codigo.toLowerCase().includes(searchTermLower)
      );
    } else {
      this.filteredProductos = [...this.productos];
    }
  }

  listarProductos() {
    console.log(this.searchTerm);
    this.params = {
      typeSearch: 'T',
      description: this.searchTerm ? this.searchTerm : '',
      mod: '',
      type: '',
      category: '',
      family: '',
      subfamily: '',
      state: '',
      advance: '',
      orderDate: '',
      user: 'renzo.lopez',
      colorState: '',
    };
    this.spinner.show();

    this.imagenService.GetListProduct(this.params).subscribe(
      (data) => {
        console.log(data);
        this.productos = data;
        this.filteredProductos = [...this.productos];

        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvanceTexto(avance: string): string {
    switch (avance) {
      case 'E':
        return 'EN PROCESO';
      case 'T':
        return 'TERMINADO OSIS';
      case 'P':
        return 'PENDIENTE';
      case 'P':
        return 'TERMINADO SAP';
      default:
        return 'CERRADO';
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'E':
        return 'color-en-proceso';
      case 'T':
        return 'color-terminado-osis';
      case 'P':
        return 'color-pendiente';
      case 'P':
        return 'color-terminado-sap';
      default:
        return 'color-cerrado';
    }
  }

  getEstadoColorClass(estado: string): string {
    switch (estado) {
      case '0':
        return 'color-estado-0';
      case '1':
        return 'color-estado-1';
      default:
        return 'color-estado-2';
    }
  }

  verProducto(producto: any) {
    this.localStorageService.setItem('producto', producto);

    this.params = {
      producto: producto.codigo,
    };

    this.productoParte.GetProductoParte(this.params).subscribe((data) => {
      console.log(data);

      if (data.length > 0) {
        this.localStorageService.setItem('producto', producto);
        this.router.navigate(
          ['/productgo/home/marketing/imagenesFormula/partes'],
          {
            queryParams: { cod_producto: producto.codigo },
          }
        );
      } else {
        this.localStorageService.setItem('producto', producto);
        console.log('first');
        this.router.navigate([
          '/productgo/home/marketing/imagenesFormula/detalle',
          producto.codigo,
        ]);
      }
    });
    this.vistaDetalle = true;
  }
}
