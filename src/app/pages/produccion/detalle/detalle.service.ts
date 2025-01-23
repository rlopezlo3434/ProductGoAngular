import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private apiurl = environment.apiURLback;

  constructor(private http: HttpClient) { 
  }

  GetListProductSupplies(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Marketing/product/supplies/list`,  { params });
  }

  GetProductoPadre(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Surtidos/listar/productoPadre`,  { params });
  }
}
