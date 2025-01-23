import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { FotosService } from './fotos.service';
import { Router } from '@angular/router';
import { PdfgeneratorService } from 'src/app/services/services/pdfgenerator.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponentAlmacen {
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


  constructor(
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private fotoService: FotosService,
    private pdfGenerator: PdfgeneratorService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

    this.params = {
      producto: this.insumos.producto,
      secuencia: this.insumos.secuencia,
    };
    this.fotoService.GetFotosProducto(this.params).subscribe(
      (data) => {
        this.fotos = data;
        this.spinner.hide();

      },
      (error) => {
        console.log(error);
      }
    );
  }

  listarinsumos(): void {
    this.spinner.show();

    this.params = {
      cia: '01',
      year: this.insumos.anio,
      month: this.insumos.mes,
      product: this.insumos.producto,
      sequence: this.insumos.secuencia,
    };
    this.fotoService.GetInsumoProducto(this.params).subscribe(
      (data) => {
        this.insumo = data;

        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listarInsumoSAP(): void {
    this.spinner.show();

    this.params = {
      cia: '01',
      year: this.insumos.anio,
      month: this.insumos.mes,
      product: this.insumos.producto,
      sequence: this.insumos.secuencia,
    };

    this.fotoService.GetInsumoProductoSap(this.params).subscribe(
      (data) => {
        this.insumoSAP = data;
        console.log(this.insumoSAP);
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listarCategorias(): void {
    this.spinner.show();

    this.params = {
      codProducto: this.insumos.producto,
      serie: this.insumos.secuencia,
    };

    this.fotoService.GetCategoriasProducto(this.params).subscribe(
      (data) => {
        this.categoriasProducto = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleVisibility(index: number) {
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
    console.log("realizar descarga");
    this.router.navigate(['/productgo/home/marketing/almacen/detalle/PreviewPDF']);

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
