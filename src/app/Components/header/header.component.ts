import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sidebarVisible: boolean = false;
  showDropdown: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    console.log(this.sidebarVisible);
  }


  toggleDropdown() {
    console.log("entre")
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    console.log('Cerrando sesión...');

  }
}
