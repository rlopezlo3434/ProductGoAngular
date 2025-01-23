import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { PartesService } from '../partes/partes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intermedio',
  templateUrl: './intermedio.component.html',
  styleUrls: ['./intermedio.component.css'],
})
export class IntermedioComponent {
  params: any;
  partes: any[] = [];
  partes2: any[] = [];
  previousPartes: any[] = []; // Para guardar datos previos

  constructor(
    private localStorageService: LocalStorageService,
    private productoParte: PartesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductPartes();
  }

  getProductPartes() {
    var localProduct = this.localStorageService.getItem('producto');

    this.params = {
      producto: localProduct.cod_producto,
    };

    this.productoParte.GetProductoParte(this.params).subscribe((data) => {
      console.log(data);
      this.partes = data;
    });
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
    this.localStorageService.setItem('producto2', producto);

    var localProduct = this.localStorageService.getItem('producto2');

    this.params = {
      producto: localProduct.cod_producto,
    };

    this.productoParte.GetProductoParte(this.params).subscribe((data) => {
      console.log(data);

      if (data.length > 0) {
        this.partes = data;
        this.router.navigate([
          '/productgo/home/marketing/imagenesFormula/intermedio',
        ]);
      } else {
        this.localStorageService.setItem('producto', producto);

        this.router.navigate([
          '/productgo/home/marketing/imagenesFormula/detalle',
          producto.codigo,
        ]);
      }
    });
  }
}
