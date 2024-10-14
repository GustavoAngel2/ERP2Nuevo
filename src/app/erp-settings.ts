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

    saveSettings(theme:string, homeStyle:string){
        localStorage.setItem('color', theme);
        localStorage.setItem('homeStyle', homeStyle);
    }

    getSettings(){
        const settings = {
            color: localStorage.getItem('color') ?? 'blue',
            homeStyle: localStorage.getItem('homeStyle') ?? 'group',
            pictureStyle: localStorage.getItem('pictureStyle') ?? 'square'
        }
        console.log(settings)
        return settings
    }

    loadSettings(){
        this.setStyle(localStorage.getItem('color') ?? 'blue')
    }
}

