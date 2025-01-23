import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurtidosService {

  private apiurl = environment.apiURLback;
  private apiExterna = environment.apiExterna;


  constructor(private http: HttpClient) { }

  GetProductos(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Surtidos/listar`, { params });
  }

  GetParteColores(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiExterna}/api/SurtidosApiExterna/listar/partesColores`, { params });
  }
}
