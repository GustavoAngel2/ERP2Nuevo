import { Injectable } from "@angular/core";
import { LanguageService } from "./core/services/language.service";

@Injectable({
  providedIn: 'root',
})
export class ERP {
  public apiUrl = 'http://67.217.245.127:5001/api';

  public paginator = [10, 25, 100];


  public modules = [
    {
      name: 'Sistema',
      items: [
        { path: '/personas', name: 'Personas', color: 'blue', icon:'bi-person-bounding-box' },
        { path: '/usuarios', name: 'Usuarios', color: 'red', icon: 'bi-person-bounding-box' },
        { path: '/roles', name: 'Roles', color: 'orange', icon: 'bi-key' },
        { path: '/permisos', name: 'Permisos', color: 'purple', icon: 'bi-person-lock' }
      ]
    },
    {
      name: 'Ventas',
      items: [
        { path: '/compras', name: 'Ordenes de compras', color: 'blue', icon: 'bi-folder' },
        { path: '/movimientos', name: 'Movimientos', color: 'blue', icon: 'bi-folder' },
        { path: '/articulos', name: 'Artículos', color: 'blue', icon: 'bi-folder' }
      ]
    },
    {
      name: 'Administración',
      items: [
        { path: '/bancos', name: 'Bancos', color: 'blue', icon: 'bi-folder' },
        { path: '/recetas', name: 'Recetas', color: 'blue', icon: 'bi-folder' },
        { path: '/reportes', name: 'Reportes', color: 'blue', icon: 'bi-folder' },
        { path: '/entradas', name: 'Entradas', color: 'blue', icon: 'bi-folder' }
      ]

    }
  ];

  constructor(private languageService: LanguageService) {}

  setStyle(theme: string) {
    const root = document.documentElement.style;

    root.setProperty(
      '--mat-toolbar-container-background-color',
      'var(--' + theme + ')'
    );
    root.setProperty(
      '--mat-expansion-container-background-color',
      'var(--' + theme + ')'
    );
    root.setProperty(
      '--mat-sidenav-container-background-color',
      'var(--dark-' + theme + ')'
    );
    root.setProperty(
      '--mat-paginator-container-background-color',
      'var(--' + theme + ')'
    );
    root.setProperty(
      '--table-color',
      'var(--ligth-' + theme + ')'
    );
    root.setProperty(
      '--header-color',
      'var(--' + theme + ')'
    );
    root.setProperty(
      '--darkAccent',
      'var(--'
    )
  }

  setBgColor(bgColor: string, theme: string) {
    const root = document.documentElement.style;

    if (bgColor == 'light') {
      root.setProperty('--bg', '#fff');
      root.setProperty('--title-color', '#000');
    } else if (bgColor == 'dark') {
      root.setProperty('--bg', '#353535');
      root.setProperty('--title-color', '#fff');
    } else {
      root.setProperty(
        '--bg',
        'var(--dark-' + theme + ')'
      );
      root.setProperty('--title-color', '#fff');
    }
  }

  saveSettings(theme: string, homeStyle: string, bgColor: string) {
    localStorage.setItem('color', theme);
    localStorage.setItem('homeStyle', homeStyle);
    localStorage.setItem('bgColor', bgColor);
  }

  getSettings() {
    const settings = {
      color: localStorage.getItem('color') ?? 'blue',
      homeStyle: localStorage.getItem('homeStyle') ?? 'group',
      bgColor: localStorage.getItem('bgColor') ?? 'light',
      pictureStyle: localStorage.getItem('pictureStyle') ?? 'square',
    };

    return settings;
  }

  loadSettings() {
    this.setStyle(localStorage.getItem('color') ?? 'blue');
    this.setBgColor(
      localStorage.getItem('bgColor') ?? 'light',
      localStorage.getItem('color') ?? 'blue'
    );
    this.languageService.setLang('es-mx').subscribe();
  }
}
