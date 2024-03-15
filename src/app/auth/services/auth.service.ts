import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

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
    const body = {
      email: email,
      password: password
    };

    return this.http.post(url, body)
      .pipe(
        tap((resp: any) => {
          this._user = resp.user;
          localStorage.setItem('token', resp.token);
        }),
        map((resp: any) => resp.status == 200)
      )
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(username: string, email: string, password: string) {
    const url = `${this.endpoint}register`;
    const body = {
      username: username,
      email: email,
      password: password
    };

    return this.http.post(url, body)
  }
}
