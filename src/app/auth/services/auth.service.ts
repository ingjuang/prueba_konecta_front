import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { CheckTokenResponse } from '../interfaces/check-token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(()=>this._currentUser());
  public authStatus = computed(()=>this._authStatus());


  constructor() {
    try {
      this.checkAuthStatus().subscribe({
        next: ()=> console.log('resuelve'),
        error: ()=> console.log('error')
      });
    } catch (error) {
      console.log(error);

    }
    console.log(this.authStatus());

  }

  private setAuthentication(user: User, token: string): boolean{
    console.log('pasa por aqui');

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.autheticated)
    localStorage.setItem('token', token);
    return true;
  }

  login(userName: string, password: string): Observable<boolean>{
    const url = `${this.baseUrl}/Login`;
    const body = {userName, password}
    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map( ({token, user})=> this.setAuthentication(user, token)),
      catchError(err=> throwError(()=> err.error.message))
    );
  }

  checkAuthStatus():Observable<boolean>{
    const url = `${this.baseUrl}/Login/CheckToken`;
    const token = localStorage.getItem('token');
    if(!token) {
      this.logout();
      return of(false);
    }
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    console.log('inicia check');

    return this.http.get<CheckTokenResponse>(url, {headers})
    .pipe(
      map( ({token, user})=> {
        console.log("respuesta");

        return this.setAuthentication(user, token)}),
      catchError(()=>{
        this._authStatus.set(AuthStatus.noAuthenticated);
        return of(false)
      })
    )
  }

  logout(){
    localStorage.removeItem('token')
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
  }
}
