import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(): boolean {
    // Verifica si el token existe en localStorage
    const token = this.localStorageService.getItem('token');
    
    if (token) {
      return true;  
    } else {
      this.router.navigate(['/productgo/login']);  // Redirige al usuario al login si no está autenticado
      return false;
    }
  }
}
