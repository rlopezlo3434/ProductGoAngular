import { Component,OnInit, EventEmitter, Output  } from '@angular/core';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {
  @Output() moduloSeleccionado = new EventEmitter<void>();
  modules: any[] = [];
  informationUser: any;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const userData = this.localStorageService.getItem('auth');
    if (userData) {
      this.modules = userData.modulos;
      this.informationUser = userData;
      console.log("hola")
      console.log(userData)
    }
  }

  toggleDropdown(module: any) {
    module.isOpen = !module.isOpen;
  }

  seleccionarModulo() {
    this.moduloSeleccionado.emit();
  }

}
