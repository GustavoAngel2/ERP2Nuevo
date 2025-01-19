import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = '';
  idUsername: string = '';
  userpassword: string = '';
  error: string = '';

  currentLang:any;

  constructor(private authService: AuthService, private router: Router, private toastr:ToastrService,private languageService:LanguageService) {}

  ngOnInit(): void {
    this.languageService.langData$.subscribe((data) => {
      this.currentLang = data;
      console.log('Current language data:', data);
    });
  }

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
