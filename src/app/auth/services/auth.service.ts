import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint = 'http://localhost:8080/api/auth/';
  private _user!: any;

  constructor(private http: HttpClient) {
  }

  get user() {
    return this._user;
  }

  login(email: string, password: string) {
    const url = `${this.endpoint}login`;
    const body = { email, password };

    return this.http.post(url, body).pipe(
      tap((resp: any) => {
        if (resp.message === "Incorrect email or password") {
          throw new Error("Incorrect email or password");
        }
        this._user = resp.user;
        localStorage.setItem('token', resp.token);
      }),
      map((resp: any) => ({ status: resp.status, message: 'Login successful' })),
      catchError((err: any) => {
        return of({ status: 400, message: err.error.message });
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(username: string, email: string, password: string) {
    const url = `${this.endpoint}new`;
    const body = {
      username: username,
      email: email,
      password: password
    };

    return this.http.post(url, body)
      .pipe(
        tap((resp: any) => {
          this._user = resp.user;
          localStorage.setItem('token', resp.token);
        }),
        map((resp: any) => resp.status == 200),
        catchError((err: any) => of(err.error.message))
      )
  }


  renewToken() {
    const url = `${this.endpoint}renew`;
    let headers = new HttpHeaders();
    headers = headers.set('token', localStorage.getItem('token') || '');
    return this.http.post(url, null, {headers})
      .pipe(
        map((resp: any) => {
          this._user = resp.user;
          localStorage.setItem('token', resp.token);
          return resp.status == 200;
        }),
        catchError(() => of(false))
      )

  }
}
