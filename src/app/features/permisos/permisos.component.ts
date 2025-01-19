import { Component,OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css'
})
export class PermisosComponent implements OnInit {
  currentLang: any;

  constructor( private languageService:LanguageService){}

  ngOnInit() {
    this.languageService.langData$.subscribe((data) => {
      this.currentLang = data;
      console.log('Current language data:', data);
    });
  }
}
