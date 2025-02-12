import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, currentUser } from './features/auth/auth.service';
import { Subscription } from 'rxjs';
import { UsusariosService } from './core/services/data.service';
import { ERP } from './erp-settings';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  currentUrl: string = '';
  imagenUrl: string | ArrayBuffer | null = null;
  actualUser: currentUser = { Id: "", NombreUsuario: "", NombrePersona: "", IdRol: "" };
  userSubscription!: Subscription;
  isAccordionExpanded = false;

  currentLang: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private erp: ERP,
    public authService: AuthService,
    private usuariosService: UsusariosService,
    private languageService: LanguageService
  ) {}


  ngOnInit() {
    this.erp.loadSettings();
    this.currentUrl = this.router.url;

    this.languageService.langData$.subscribe((data) => {
      this.currentLang = data;
      console.log('Current language data:', data);
    });

    // Suscripción a cambios en la URL para recargar configuración
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.erp.loadSettings();
        this.currentUrl = this.router.url;
        const root = document.documentElement.style;
        if (this.currentUrl != "/login"){
          root.setProperty('--margin-toolbar', '78px');
        } else {
          root.setProperty('--margin-toolbar','-40px')
        }

      }
    });

    // Suscripción a cambios de usuario para actualizar imagen y perfil
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.actualUser = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getTitle(): string {
    return "ERP - " + this.currentUrl.replace(/^\//, '').charAt(0).toUpperCase() + this.currentUrl.slice(2);
  }

  detectClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const accordion = document.querySelector('.toolbar-accordion');

    if (
      this.isAccordionExpanded &&
      accordion &&
      !accordion.contains(clickedElement)
    ) {
      this.isAccordionExpanded = false;
    }
  }

  closeAccordion() {
    this.isAccordionExpanded = false;
  }

  logout() {
    this.authService.logout();
    this.closeAccordion();
  }
}
