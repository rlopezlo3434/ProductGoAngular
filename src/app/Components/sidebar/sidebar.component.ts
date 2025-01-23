import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  userData: any;
  showDropdown: boolean = false;

  constructor(private localStorageService: LocalStorageService, private router: Router) {
   }

   ngOnInit() {
  }

  
  toggleDropdown() {
    console.log("entre")
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    console.log('Cerrando sesión...');
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('auth');

    this.router.navigate(['/productgo/login']);
  }
  
}
