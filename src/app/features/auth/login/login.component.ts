import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  idUsername: string = '';
  userpassword: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr:ToastrService) {}

  login() {
    const credentials = { username: this.username, idUsername: this.idUsername, userpassword: this.userpassword };
    console.log(credentials);
    this.authService.login(credentials).subscribe(
      response => {
        if (response) {
          this.toastr.success(('Hola ' + this.username + '!'), 'Inicio de sesion exitoso!');
          this.router.navigate(['/inicio']);
        } else {
          this.toastr.error('Usuario o contraseña incorrecto. Por favor intentelo de nuevo', 'Error al iniciar sesión!');
          console.log(this.error)
        }
      },
      err => {
        this.toastr.error('Usuario o contraseña incorrecto. Por favor intentelo de nuevo', 'Error al iniciar sesión!');
      }
    );
  }
}
