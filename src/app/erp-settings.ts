import { Injectable } from "@angular/core";
import { LanguageService } from "./core/services/language.service";

@Injectable({
  providedIn: 'root',
})
export class ERP {
  public apiUrl = 'https://localhost:5001/api';

  public paginator = [10, 25, 100];

  public modules = [
    {
      name: 'Sistema',
      items: [
        { path: '/personas', name: 'Personas' },
        { path: '/usuarios', name: 'Usuarios' },
        { path: '/roles', name: 'Roles' },
        { path: '/permisos', name: 'Permisos' }
      ]
    },
    {
      name: 'Ventas',
      items: [
        { path: '/compras', name: 'Ordenes de compras' },
        { path: '/movimientos', name: 'Movimientos' },
        { path: '/articulos', name: 'Artículos' }
      ]
    },
    {
      name: 'Administración',
      items: [
        { path: '/bancos', name: 'Bancos' },
        { path: '/recetas', name: 'Recetas' },
        { path: '/reportes', name: 'Reportes' },
        { path: '/entradas', name: 'Entradas' }
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
      root.setProperty('--mat-sidenav-content-background-color', '#fff');
      root.setProperty('--title-color', '#000');
    } else if (bgColor == 'dark') {
      root.setProperty('--mat-sidenav-content-background-color', '#353535');
      root.setProperty('--title-color', '#fff');
    } else {
      root.setProperty(
        '--mat-sidenav-content-background-color',
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
    this.languageService.setLang('en-us').subscribe();
  }
}
