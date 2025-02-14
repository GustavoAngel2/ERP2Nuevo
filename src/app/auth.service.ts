import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ERP } from './erp-settings';

export interface currentUser {
  Id: string;
  NombreUsuario: string;
  NombrePersona: string;
  IdRol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<currentUser>;
  public currentUser: Observable<currentUser>;

  constructor(private http: HttpClient, private erp:ERP) {
    this.currentUserSubject = new BehaviorSubject<currentUser>(this.getStoredUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): currentUser {
    return {
      Id: sessionStorage.getItem('Id') ?? '',
      NombreUsuario: sessionStorage.getItem('NombreUsuario') ?? '',
      NombrePersona: sessionStorage.getItem('NombrePersona') ?? '',
      IdRol : ''
    };
  }

  login(credentials: { username: string, idUsername: string, userpassword: string }): Observable<any> {
    return this.http.post<any>(`${this.erp.apiUrl}/SignIn`, credentials).pipe(
      map(response => {
        console.log('API response:', response);
        if (response && response.Success && response.Response && response.Response.data && response.Response.data.Token) {
          sessionStorage.setItem('Token', response.Response.data.Token);
          this.setIdUsername(response.Response.data.Usuario.Id.toString());
          this.setUsername(response.Response.data.Usuario.NombreUsuario);
          this.setRol(response.Response.data.Usuario.NombrePersona);
          this.updateCurrentUser(response.Response.data.Usuario);
          return response.Response.data;
        } else {
          throw new Error('Invalid API response');
        }
      }),
      catchError(error => {
        console.error('Error in login service:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('Id');
    sessionStorage.removeItem('NombreUsuario');
    sessionStorage.removeItem('NombrePersona');
    this.updateCurrentUser({ Id: '', NombreUsuario: '' ,NombrePersona:'', IdRol:''});
  }

  getToken() {
    return sessionStorage.getItem('Token');
  }

  setIdUsername(id: string) {
    sessionStorage.setItem('Id', id);
    console.log('IdUsername set in sessionStorage:', id);
  }

  setUsername(username: string) {
    sessionStorage.setItem('NombreUsuario', username);
    console.log('Username set in sessionStorage:', username);
  }
  
  setRol(rol: string) {
    sessionStorage.setItem('NombrePersona', rol);
    console.log('Rol set in sessionStorage:', rol);
  }

  getIdUsername(): string {
    return sessionStorage.getItem('Id') ?? '';
  }

  getUsername(): string {
    return sessionStorage.getItem('NombreUsuario') ?? '';
  }

  getRol():string{
    return sessionStorage.getItem('NombrePersona') ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private updateCurrentUser(user: currentUser) {
    this.currentUserSubject.next(user);
  }

  // Nuevo método para obtener el usuario actual
  getCurrentUser(): currentUser {
    return this.currentUserSubject.value;
  }
}
