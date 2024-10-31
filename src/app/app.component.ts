import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService,currentUser } from './auth.service';
import { Subscription } from 'rxjs';
import { UsusariosService } from './data.service';
import { ERP } from './erp-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  currentUrl: string = '';
  imagenUrl: string | ArrayBuffer | null = null;
  profile: currentUser = {
    Id: "",
    IdRol: "",
    NombreUsuario: "",
    NombrePersona: ""
  };


  constructor(private router: Router,
    private route: ActivatedRoute,
    private erp:ERP,
    public authService:AuthService,
    private usuariosService: UsusariosService) {}
  value = 'clear me'


  ngOnInit() {
    this.erp.loadSettings();
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.erp.loadSettings();
        this.currentUrl = this.router.url;

      }
    });
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.actualUser = user;
    });


    this.profile = this.authService.getCurrentUser();

    if (this.profile?.Id) {
       // Convierte a número si Id es string
       this.cargarImagenUsuario(parseInt(this.profile.Id,10));
    }
  }

  getTitle():string{
    return "ERP - " + this.currentUrl.replace(/^\//, '').charAt(0).toUpperCase() + this.currentUrl.slice(2);
  }

  actualUser: currentUser = { Id: "", NombreUsuario: "",NombrePersona:"", IdRol:""};
  userSubscription!: Subscription;

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  cargarImagenUsuario(id: number): void {
    this.usuariosService.obtenerImagenUsuario(id).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = () => this.imagenUrl = reader.result;
        reader.readAsDataURL(response);
      },
      error => {
        console.error("Error al cargar la imagen del usuario", error);
      }
    );
  }


  logout() {
    this.authService.logout();
  }
}
