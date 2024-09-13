import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService,currentUser } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute, public authService:AuthService) {}
  value = 'clear me'

  ngOnInit() {
    // Obtener la URL actual directamente
    this.currentUrl = this.router.url;
    this.setStyle('blue')
    // Suscribirse a los cambios de la ruta
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
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

  setStyle(theme:string){
    const root = document.documentElement.style;

    // Cambiar los valores de las variables CSS
    root.setProperty('--mat-toolbar-container-background-color', ('var(--' + theme + ')'));
    root.setProperty('--mat-expansion-container-background-color', ('var(--' + theme + ')'));
    root.setProperty('--mat-toolbar-standard-height', '70px');
    root.setProperty('--mat-toolbar-mobile-height', '60px');
    root.setProperty('--mat-sidenav-container-text-color', '#e0e0e0');
    root.setProperty('--mat-sidenav-container-background-color', '#2b2b2b');
    root.setProperty('--mat-sidenav-content-background-color', '#1a1a1a');
    root.setProperty('--mat-sidenav-scrim-color', 'rgba(0, 0, 0, 0.7)');
  }
}