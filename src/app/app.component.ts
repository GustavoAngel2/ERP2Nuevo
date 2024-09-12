import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}
  value = 'clear me'

  ngOnInit() {
    // Obtener la URL actual directamente
    this.currentUrl = this.router.url;

    // Suscribirse a los cambios de la ruta
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.currentUrl = this.router.url;
        console.log('Ruta actual:', this.currentUrl);
      }
    });
  }
}