import { Component } from '@angular/core';
import { ERP } from '../../erp-settings';
import { OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})

export class AjustesComponent implements OnInit{
  settings:any;
  color:string = '';
  bgColor:string = '';
  selectedColor: string = '#ffffff'; // Color inicial

  currentLang: any;

  constructor(private erp:ERP, private languageService:LanguageService){}

  ngOnInit(): void {
    this.settings = this.erp.getSettings();
    this.color = this.settings.color
    this.bgColor = this.settings.bgColor

    this.languageService.langData$.subscribe((data) => {
      this.currentLang = data;
      console.log('Current language data:', data);
    });
  }

  setColorSystem(theme:string){
    this.color = theme
    this.erp.setStyle(theme)

    if(this.bgColor == 'color'){
      this.setBgColor('color')
    }
    this.save()
  }

  setBgColor(type:string){
    console.log(type)
    this.bgColor = type
    this.erp.setBgColor(this.bgColor,this.color)
    this.save()
  }

  save(){
    this.erp.saveSettings(this.color, 'group', this.bgColor)
  }
}
