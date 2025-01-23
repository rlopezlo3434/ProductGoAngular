import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/services/auth.service';
import { LocalStorageService } from 'src/app/services/services/local-storage.service';

type NewType = AuthService;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Variable para almacenar el valor del username
  password: string = ''; // Variable para almacenar el valor del password
  aplicacion: number = 8; // Variable para almacenar el valor de la aplicación
  usernameFocus: boolean = false; // Variable para controlar el estado de foco del campo username
  passwordFocus: boolean = false; // Variable para controlar el estado de foco del campo password

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  onUsernameFocus() {
    console.log(this.username);
    if (this.username === '') {
      this.usernameFocus = true;
    } else {
      this.usernameFocus = false;
    }
  }

  // Función para manejar la pérdida de foco en el campo username
  onUsernameBlur() {
    if (!this.username) {
      this.usernameFocus = false;
    }
  }

  // Función para manejar el inicio de foco en el campo password
  onPasswordFocus() {
    console.log(this.password);
    if (this.password === '') {
      this.passwordFocus = true;
    } else {
      this.passwordFocus = false;
    }
  }

  // Función para manejar la pérdida de foco en el campo password
  onPasswordBlur() {
    if (!this.password) {
      this.passwordFocus = false;
    }
  }

  onSubmit() {
    // Aquí puedes agregar la lógica para enviar el username y password al servidor
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    var aplicacion = '8';
    this.spinner.show();
    this.authService
      .login(this.username, this.password, this.aplicacion)
      .subscribe(
        (response) => {
          this.localStorageService.setItem('auth', response);
          this.localStorageService.setItem('rol_user', response.rol_Codigo);

          const token = response.token.replace(/"/g, '');
          this.localStorageService.setItem('token', token);

          this.localStorageService.setItem('token', response.token);
          if (response.rol_Codigo !== 'PG_PRODUCCION') {
            this.router.navigate(['ProductGo/home']);
          } else if (response.rol_Codigo === 'PG_PRODUCCION') {

            this.router.navigate(['/productgo/home/marketing/imagenesFormula']);
          } else {
            console.log('error');
          }

          this.spinner.hide();
        },
        (error) => {
          console.error('Login error:', error);
          this.spinner.hide();
        }
      );
  }
}
