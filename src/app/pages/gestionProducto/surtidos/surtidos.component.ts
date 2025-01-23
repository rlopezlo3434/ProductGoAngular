import { Component, OnInit } from '@angular/core';
import { SurtidosService } from './surtidos.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-surtidos',
  templateUrl: './surtidos.component.html',
  styleUrls: ['./surtidos.component.css'],
})
export class SurtidosComponent implements OnInit{
  searchTerm$ = new Subject<string>();


  selectedProducto: string = '';
  filteredOptions4: any[] = [];
  productoPT: any = { partes: [] };

  constructor(private servicesSurtidos: SurtidosService) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  setupSearch(): void {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        switchMap((term) =>
          this.servicesSurtidos.GetProductos({ codigoProducto: term })
        )
      )
      .subscribe((response: any) => {
        this.filteredOptions4 = response.value || [];
      });
  }

  filter4(value: string): void {
    this.searchTerm$.next(value);
  }

  onOptionSelected4(event: any): void {
    console.log(event);
    const selectedOption = this.filteredOptions4.find(
      (o: any) => o.codigoProducto === event.option.value
    );
    if (selectedOption) {
      console.log(selectedOption);
      this.selectedProducto = selectedOption.codigoProducto;
    }
  }

  buscarProducto(){
    
    this.servicesSurtidos.GetParteColores({ codigoProducto: this.selectedProducto }).subscribe(response => {
      console.log(response)
      this.productoPT = response[0]
    })
  }
}
