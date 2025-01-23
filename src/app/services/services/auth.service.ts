import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  login(user: string, password: string, aplicacion: number): Observable<any> {
    const paypload = { user, password, aplicacion };
    console.log("holaaa")
    return this.http.post(`${this.apiurl}/api/Auth`, paypload);
  }
}
