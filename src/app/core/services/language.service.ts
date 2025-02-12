import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private langDataSubject = new BehaviorSubject<any>(null); // Variable global reactiva
  public langData$ = this.langDataSubject.asObservable();  // Observable expuesto

  constructor(private http: HttpClient) {}

  setLang(lang: string): Observable<any> {
    return this.http.get(`/assets/lang/${lang}.json`).pipe(
      tap((data) => {
        this.langDataSubject.next(data); // Actualiza la variable global
      })
    );
  }

  // Método para obtener el valor actual almacenado
  getCurrentLangData(): any {
    return this.langDataSubject.getValue();
  }
}

