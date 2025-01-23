import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { PdfgeneratorService } from 'src/app/services/services/pdfgenerator.service';
import { Router } from '@angular/router';
import { FotosService } from './fotos.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent {
  @ViewChildren('categoria') categoriasElements!: QueryList<ElementRef>;

  @Output() downloadRequested = new EventEmitter<void>();

  isVisible2: boolean = false;
  insumos: any;
  params: any;
  fotos: any = [];
  insumo: any = [];
  insumoSAP: any = [];
  extraButtons = [];
  categoriasProducto: any = [];

  isVisible: boolean[] = [];
  selectedImage: string | null = null;
  categoriaAbierta: number | null = null;
  categoriaAbierta2: number | null = null;
  cantidades: any
  constructor(
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private fotoService: FotosService,
    private pdfGenerator: PdfgeneratorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cantidadesString = localStorage.getItem('cantidades');
    this.cantidades = JSON.parse(cantidadesString || '{}');
  
    const cantidadInsumo = Array.isArray(this.cantidades.cantidadInsumo)
      ? this.cantidades.cantidadInsumo[0]
      : 0;
  
    const cantidadProduccion = Array.isArray(this.cantidades.cantidadProduccion)
      ? this.cantidades.cantidadProduccion[0]
      : 0;
  
    console.log('Primer valor de cantidadInsumo:', cantidadInsumo);
    console.log('Primer valor de cantidadProduccion:', cantidadProduccion);
  
    this.cantidades.cantidadInsumo = cantidadInsumo;
    this.cantidades.cantidadProduccion = cantidadProduccion;
    
    this.insumos = this.localStorageService.getItem('insumo');
    console.log(this.insumos);
    this.listarFotosProduct();
    this.listarinsumos();
    this.listarInsumoSAP();
    this.listarCategorias();
    this.isVisible = this.fotos.map(() => false);
  }

  listarFotosProduct(): void {
    this.spinner.show();

    const secuencias = this.insumos.secuencia;
    const fotosCompleta: any[] = [];
    secuencias.forEach((sec: any, index: any) => {
      this.params = {
        producto: this.insumos.producto,
        secuencia: sec.secuencia,
      };
      this.fotoService.GetFotosProducto(this.params).subscribe(
        (data) => {
          fotosCompleta.push(...data);
          if (index === secuencias.length - 1) {
            this.fotos = fotosCompleta;
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  listarinsumos(): void {
    this.spinner.show();

    const secuencias = this.insumos.secuencia;
    const insumosCompleta: any[] = [];
    secuencias.forEach((sec: any, index: any) => {
      this.params = {
        cia: '01',
        year: this.insumos.anio,
        month: this.insumos.mes,
        product: this.insumos.producto,
        sequence: sec.secuencia,
      };
      this.fotoService.GetInsumoProducto(this.params).subscribe(
        (data) => {
          data.forEach((item: any) => {
            console.log(insumosCompleta, "insumoCompleta")
            if (!insumosCompleta.some((i) => i.insumo_codigo === item.insumo_codigo)) {
              insumosCompleta.push(item);
            }
          });
          if (index === secuencias.length - 1) {
            this.insumo = insumosCompleta;
          }
          console.log(this.insumo);

          this.spinner.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  listarInsumoSAP(): void {
    this.spinner.show();

    const secuencias = this.insumos.secuencia;
    const insumosSAPCompleta: any[] = [];

    secuencias.forEach((sec: any, index: any) => {
      this.params = {
        cia: '01',
        year: this.insumos.anio,
        month: this.insumos.mes,
        product: this.insumos.producto,
        sequence: sec.secuencia,
      };

      this.fotoService.GetInsumoProductoSap(this.params).subscribe(
        (data) => {
          data.forEach((item: any) => {
            console.log(insumosSAPCompleta, "insumoCompleta")
            if (!insumosSAPCompleta.some((i) => i.insumo_codigo === item.insumo_codigo)) {
              insumosSAPCompleta.push(item);
            }
          });
          if (index === secuencias.length - 1) {
            this.insumoSAP = insumosSAPCompleta;
          }
          console.log(this.insumoSAP);
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  listarCategorias(): void {
    this.spinner.show();

    const secuencias = this.insumos.secuencia;
    const categoriasCompletas: any[] = [];

    secuencias.forEach((sec: any, index: any) => {
      const params = {
        codProducto: this.insumos.producto,
        serie: sec.secuencia, // Envía la secuencia actual
      };

      this.fotoService.GetCategoriasProducto(params).subscribe(
        (data) => {
          categoriasCompletas.push(...data);
          if (index === secuencias.length - 1) {
            this.categoriasProducto = categoriasCompletas;
            console.log(categoriasCompletas)
            this.spinner.hide();
          }
        },
        (error) => {
          console.log(error);
          if (index === secuencias.length - 1) {
            this.spinner.hide(); // Asegúrate de ocultar el spinner en caso de error
          }
        }
      );
    });
  }

  toggleVisibility(index: number) {
    // this.isVisible[index] = !this.isVisible[index];
    this.categoriaAbierta = this.categoriaAbierta === index ? null : index;
  }

  toggleVisibility2(index: number) {
    this.categoriaAbierta2 = this.categoriaAbierta2 === index ? null : index;
  }

  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }

  selectCanal(canal: string): string {
    if (canal == 'OSIS') {
      return 'color-canal-0';
    } else {
      return 'color-canal-1';
    }
  }

  previewFIP() {
    console.log('realizar descarga');
    this.router.navigate([
      '/productgo/home/marketing/imagenesFormula/detalle/PreviewPDF',
    ]);

    // this.pdfGenerator.generatePdf('pdfContent', 'mi-documento');
  }

  scrollToCategory(index: number) {
    const elementId = 'categoria' + index;
    const categoriaElement = document.getElementById(elementId);
    if (categoriaElement) {
      categoriaElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
