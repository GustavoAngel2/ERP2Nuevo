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

    setBgColor(bgColor:string,theme:string){
        const root = document.documentElement.style

        if(bgColor == 'light'){
            root.setProperty('--mat-sidenav-content-background-color', '#fff')
        } else if (bgColor == 'dark'){
            root.setProperty('--mat-sidenav-content-background-color', '#353535')
        } else {
            root.setProperty('--mat-sidenav-content-background-color', ('var(--dark-' + theme + ')'))
        }
        
    }

    saveSettings(theme:string, homeStyle:string,bgColor:string){
        localStorage.setItem('color', theme);
        localStorage.setItem('homeStyle', homeStyle);
        localStorage.setItem('bgColor', bgColor)
    }

    getSettings(){
        const settings = {
            color: localStorage.getItem('color') ?? 'blue',
            homeStyle: localStorage.getItem('homeStyle') ?? 'group',
            bgColor: localStorage.getItem('bgColor') ?? 'light',
            pictureStyle: localStorage.getItem('pictureStyle') ?? 'square'
        }
        console.log(settings)
        return settings
    }

    loadSettings(){
        this.setStyle(localStorage.getItem('color') ?? 'blue')
        this.setBgColor(localStorage.getItem('bgColor') ?? 'light',localStorage.getItem('color') ?? 'blue')
    }
}

