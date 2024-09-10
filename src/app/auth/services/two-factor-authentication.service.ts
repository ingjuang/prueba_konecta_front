import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwoFactorAuthenticationService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  private _isTFA = signal<boolean>(false);
  private _haveTFA = signal<boolean>(false);
  private _qrCode = signal<string|null>(null)

  public isTFA = computed(() => this._isTFA());
  public haveTFA = computed(() => this._haveTFA());
  public qrCode = computed(()=> this._qrCode());

  checkTFA(userName: string) {
    const tfa = localStorage.getItem(`tfa ${userName}`);
    if (!tfa) {
      this._isTFA.set(false);
    } else {
      this._isTFA.set(true);
    }
  }

  getQRCode(userName: string): Observable<any> {
    const url = `${this.baseUrl}/TwoFactor/GetQRCode?userName=${userName}`;
    return this.http.get<any>(url).pipe(
      map((res) => {
        this._haveTFA.set(true);
        this._qrCode.set(res.result)
        return res
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  validateCode(userName: string, code: string): Observable<boolean> {
    const url = `${this.baseUrl}/TwoFactor/ValidateCode?userName=${userName}&code=${code}`;
    return this.http.get<boolean>(url).pipe(
      map((res) => {
        if(res === true){
          this._isTFA.set(true);
          localStorage.setItem(`tfa ${userName}`, 'true')
        }
        return res;
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  HaveTFA(userName: string): Observable<boolean> {
    const url = `${this.baseUrl}/TwoFactor/HaveTFA?userName=${userName}`;
    return this.http.get<boolean>(url).pipe(
      map((res) => {
        if(res)
          this._haveTFA.set(true);
        else
          this._haveTFA.set(false);
        return res;
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
