import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private apiurl = environment.apiURLback;

  constructor(private http: HttpClient) { 
  }

  GetFotosProducto(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Marketing/list/ImagenesUpload/Produccion`,  { params });
  }

  GetInsumoProducto(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Marketing/product/supplies/detail/list`,  { params });
  }

  GetInsumoProductoSap(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Marketing/product/detail/sap/list`,  { params });
  }

  GetCategoriasProducto(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Marketing/list/GrupoImagenes`,  { params });
  }
}
