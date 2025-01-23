import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfgeneratorService {

  constructor() { }

 
  public generatePdf(elementIds: string[], fileName: string): void {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // Márgenes alrededor de las imágenes

    let pageAdded = false;

    elementIds.forEach(async (elementId, index) => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Elemento HTML no encontrado: ${elementId}`);
        return;
      }

      // Usar html2canvas para capturar el elemento actual
      await html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdfWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Agrega una nueva página si no es la primera sección
        if (pageAdded) {
          pdf.addPage();
        }

        // Añadir la imagen a la página actual del PDF
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        pageAdded = true;
      }).catch(error => {
        console.error(`Error al generar el PDF para el elemento ${elementId}`, error);
      });

      // Guardar el PDF una vez que se han procesado todos los elementos
      if (index === elementIds.length - 1) {
        pdf.save(`${fileName}.pdf`);
      }
    });
  }
}
