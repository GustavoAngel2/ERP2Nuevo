import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ERP{
    setStyle(theme:string){
        const root = document.documentElement.style;

        root.setProperty('--mat-toolbar-container-background-color', ('var(--' + theme + ')'));
        root.setProperty('--mat-expansion-container-background-color', ('var(--' + theme + ')'));
        root.setProperty('--mat-sidenav-container-background-color',('var(--dark-' + theme + ')'));
        root.setProperty('--mat-paginator-container-background-color',('var(--' + theme + ')'));
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

