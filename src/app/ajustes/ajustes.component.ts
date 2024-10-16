import { Component } from '@angular/core';
import { ERP } from '../erp-settings';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})
export class AjustesComponent implements OnInit{
  settings:any;
  color:string = '';
  bgColor:string = '';

  constructor(private erp:ERP){}

  ngOnInit(): void {
    this.settings = this.erp.getSettings();
    this.color = this.settings.color
    this.bgColor = this.settings.bgColor
  }

  setColorSystem(theme:string){
    this.color = theme
    this.erp.setStyle(theme)

    if(this.bgColor == 'color'){
      this.setBgColor('color')
    }
  }

  setBgColor(type:string){
    console.log(type)
    this.bgColor = type
    this.erp.setBgColor(this.bgColor,this.color)
  }

  save(){
    this.erp.saveSettings(this.color, 'group', this.bgColor)
  }
}
