import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ERP{
    setStyle(theme:string){
        const root = document.documentElement.style;

        root.setProperty('--mat-toolbar-container-background-color', ('var(--' + theme + ')'));
        root.setProperty('--mat-expansion-container-background-color', ('var(--' + theme + ')'));
        root.setProperty('--mat-toolbar-standard-height', '70px');
        root.setProperty('--mat-toolbar-mobile-height', '60px');
        root.setProperty('--mat-sidenav-container-text-color', '#e0e0e0');
        root.setProperty('--mat-sidenav-container-background-color', '#2b2b2b');
        root.setProperty('--mat-sidenav-content-background-color', ('var(--dark-' + theme + ')'));
        root.setProperty('--mat-sidenav-scrim-color', 'rgba(0, 0, 0, 0.7)');
        root.setProperty('--button-color', ("var(--"+ theme+")"))
    }

    saveSettings(theme:string){
        localStorage.setItem('color', theme);
    }

    getSettings(){
        const settings = {
            color: localStorage.getItem('color') ?? 'blue'
        }
        return settings
    }

    loadSettings(){
        this.setStyle(localStorage.getItem('color') ?? 'blue')
    }
}

