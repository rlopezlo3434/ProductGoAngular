import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenesProdService {

  
  private apiurl = environment.apiURLback;

  constructor(private http: HttpClient) { 
  }

  GetListProduct(params: any): Observable<any> {
    console.log(params);
    return this.http.get<any[]>(`${this.apiurl}/api/Marketing/product/list`, { params });
  }
}
