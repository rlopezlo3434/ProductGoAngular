import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';
import { PdfgeneratorService } from 'src/app/services/services/pdfgenerator.service';
import { PdfFipService } from './pdf-fip.service';

@Component({
  selector: 'app-pdf-fip',
  templateUrl: './pdf-fip.component.html',
  styleUrls: ['./pdf-fip.component.css']
})
export class PdfFipComponentAlmacen {
  fechaHoy: Date = new Date();
  producto: any = [];
  parteProducto: any = [];
  parteProducto2: any[] = [];
  coloresPorProducto: any = {};
  insumos: any = [];
  fotos: any = [];
  fotos2: any = [];
  fotos3: any = [];
  insumo: any = [];
  constructor(
    private pdfGenerator: PdfgeneratorService,
    private localStorageService: LocalStorageService,
    private pdfFipService: PdfFipService
  ) {}

  ngOnInit() {
    const insumoO = [this.localStorageService.getItem('insumo')];
    this.insumos = insumoO.map((item:any) => {
      return {
        ...item,
        canal: item.canal.map((c: any) => c.canal_nombre).join(', '),
        cliente: item.cliente.map((c:any) => c.cliente_nombre).join(', ')
      };
    });
    console.log(this.insumos)
    this.producto = this.localStorageService.getItem('producto');
    this.obtenerParteProducto();
    this.listarFotosProduct();
    this.listarinsumos();
  }

  downloadFIP() {
    console.log('realizar descarga');
    this.pdfGenerator.generatePdf(
      ['pdfcontent1', 'pdfcontent2'],
      'mi-documento'
    );
  }

  validateObject(value: any): string {
    return typeof value === 'object' ? '-' : value;
  }

  async obtenerParteProducto() {
    const params = {
      producto: 'ESX005000',
    };

    await this.pdfFipService.GetParteProducto(params).subscribe((data: any) => {
      this.parteProducto = data;
      console.log(data);

      // Llama a obtenerColores después de que parteProducto esté disponible
      this.obtenerColores();
    });
  }

  getEmptySlots(currentLength: number): any[] {
    const totalSlots = 6;
    const emptySlots = totalSlots - currentLength;
    return new Array(emptySlots > 0 ? emptySlots : 0);
  }

  async obtenerColores() {
    // Inicializa parteProducto2 como un array vacío
    this.parteProducto2 = [];

    for (const element of this.parteProducto) {
      const params = {
        cia: '01',
        codigoProducto: element.cod_producto,
      };

      // Asegúrate de inicializar la propiedad colores del elemento
      element.colores = [];

      // Espera la respuesta del servicio
      await this.pdfFipService
        .GetColoresProducto(params)
        .toPromise()
        .then((data: any) => {
          // Asigna los colores obtenidos a la propiedad colores del producto
          element.colores = data.map((color: any) => ({
            color: color.color,
            descripcioncolor: color.descripcioncolor,
            colorsap: color.colorsap,
            descripcioncolorsap: color.descripcioncolorsap,
            codigosap: color.codigosap,
            descripcionsap: color.descripcionsap,
          }));

          console.log(`Colores para ${element.cod_producto}:`, data);

          // Agrega el elemento con colores a parteProducto2
          this.parteProducto2.push({
            cod_producto: element.cod_producto,
            des_producto: element.des_producto,
            colores: element.colores, // Agrega los colores
          });
          console.log(this.parteProducto2);
        });
    }
  }
  maxColorsArray(productos: any[]): number[] {
    const maxColors = Math.max(...productos.map((p) => p.colores.length));
    return Array.from({ length: maxColors }, (_, i) => i);
  }

  async listarFotosProduct() {
    const params = {
      producto: this.insumos.producto,
      secuencia: this.insumos.secuencia,
    };
    await this.pdfFipService.GetFotosProducto(params).subscribe(
      (data) => {
        this.fotos = data[0];
        this.fotos2 = data
          .slice(1)
          .filter(
            (obj: any) => obj.insumoFlag !== 1 && obj.masterpackFlag !== 1
          );
        this.fotos3 = data.slice(1).filter((obj: any) => obj.insumoFlag === 1);
        console.log(this.fotos);
        console.log(this.fotos2);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async listarinsumos() {
    console.log(this.insumos)
    const params = {
      cia: '01',
      year: this.insumos[0].anio,
      month: this.insumos[0].mes,
      product: this.insumos[0].producto,
      sequence: this.insumos[0].secuencia,
    };
  
    console.log("Parámetros para listarinsumos:", params); // Verificar los valores de los parámetros
  
    await this.pdfFipService.GetInsumoProducto(params).subscribe(
      (data) => {
        this.insumo = data;
        console.log("Insumo:", this.insumo);
      },
      (error) => {
        console.log("Error al obtener insumos:", error);
      }
    );
  }
}
