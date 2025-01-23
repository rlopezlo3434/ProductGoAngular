import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CapacidadesService {
  private apiurl = environment.apiURLback;

  constructor(private http: HttpClient) {}

  GetListProductSupplies(): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Registro/procesos`, {});
  }

  GetListActividad(): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Registro/actividad`, {});
  }

  GetListOperario(): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Registro/operarios`, {});
  }

  GetRegistros(params:any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Registro/registros`, { params });
  }

  GetProductos(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Registro/producto`, { params });
  }

  GetSave(params: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/api/Registro/save`, { params });
  }
}
