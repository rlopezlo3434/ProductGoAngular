import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { PartesService } from './partes.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css'],
})
export class PartesComponent implements OnInit {
  params: any;
  partes: any[] = [];
  partes2: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private productoParte: PartesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      var producto = params['cod_producto'];

      this.getProductPartes(producto);
    });
  }

  getProductPartes(codigo_producto: string) {
    this.params = {
      producto: codigo_producto,
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

    this.params = {
      producto: producto.cod_producto,
    };

    this.productoParte.GetProductoParte(this.params).subscribe((data) => {
      console.log(data);

      if (data.length > 0) {
        this.localStorageService.setItem('producto', producto);
        this.router.navigate(
          ['/productgo/home/marketing/imagenesFormula/partes'],
          {
            queryParams: { cod_producto: producto.cod_producto },
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
  }
}
