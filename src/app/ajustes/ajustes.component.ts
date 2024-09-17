import { Component } from '@angular/core';
import { ERP } from '../erp-settings';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})
export class AjustesComponent implements OnInit{
  settings:any
  color:string = ''

  constructor(private erp:ERP){}

  ngOnInit(): void {
    this.settings = this.erp.getSettings();
    console.log(this.settings)
  }

  setColor(theme:string){
    this.color = theme
    this.erp.setStyle(theme)
  }

  save(){
    this.erp.saveSettings(this.color)
  }
}
