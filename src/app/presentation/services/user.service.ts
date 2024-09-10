import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel, UserResponse } from '../interfaces/user.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  public users = signal<UserModel[]>([])
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor() {}

  getUsers() {
    const url = `${this.baseUrl}/User/GetUsers`;
    return this.http.get<UserResponse>(url, { headers: this.headers }).pipe(
      map((res) => {
        this.users.set(res.result);
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  createUser(user: any) {
    const url = `${this.baseUrl}/User`;
    return this.http
      .post<UserResponse>(url, user, { headers: this.headers })
      .pipe(
        map((res) => res),
        catchError((err) => throwError(() => err.error.message))
      );
  }
}
