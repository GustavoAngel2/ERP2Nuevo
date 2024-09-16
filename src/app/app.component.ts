import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService,currentUser } from './auth.service';
import { Subscription } from 'rxjs';
import { ERP } from './erp-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private erp:ERP, public authService:AuthService) {}
  value = 'clear me'


  ngOnInit() {
    this.erp.loadSettings();
    // Obtener la URL actual directamente
    this.currentUrl = this.router.url;
    // Suscribirse a los cambios de la ruta
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.erp.loadSettings();
        this.currentUrl = this.router.url;
        console.log('Ruta actual:', this.currentUrl);
      }
    });
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.actualUser = user;
    });
  }

  actualUser: currentUser = { Id: "", NombreUsuario: "",NombrePersona:"", IdRol:""};
  userSubscription!: Subscription;

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }
}