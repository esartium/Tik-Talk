import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);

  cookieServise = inject(CookieService);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';

  access_token: string | null = null;
  refresh_token: string | null = null;

  router = inject(Router);

  get isAuth() { // геттер для проверки того, авторизован ли пользователь с таким токеном
    if (!this.access_token) {
      this.access_token = this.cookieServise.get('access_token');
      this.refresh_token = this.cookieServise.get('refresh_token')
    }
    return !!this.access_token;
  }

  login(payload: {username: string, password: string}) {
    // В этом методе на бэке принимаются данные не в привычном json, а в x-www-form-urlencoded
    // Как перевести их в этот формат:
    const fd: FormData = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd) // пока мы не указали тут <TokenResponse>, VScode предлагал после res. обычные методы объекта (типа res - это просто какой-то объект, хз какой); после указания - предлагает поля ответа, которые мы прописывали в интерфейсе
      .pipe(
        tap(res => this.saveTokens(res))
        )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}refresh`, {refresh_token: this.refresh_token})
      .pipe(
        tap(res => this.saveTokens(res)),
        catchError(err => {
          this.logout(); // делаем принудительный logout
          return throwError(err); // выкидываем ошибку
        })
      )
  }

  logout() {
    // вообще лучше сделать это через бэк, но тут мы просто сотрём куки
    this.cookieServise.deleteAll(); 
    // обнулим токены
    this.access_token = null;
    this.refresh_token = null;
    // и перенаправим на страницу аворизации
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse) { // эта логика используется в двух местах, так что вынесли ее в отдельную функцию
      this.access_token = res.access_token;
      this.refresh_token = res.refresh_token;

      this.cookieServise.set('access_token', this.access_token);
      this.cookieServise.set('refresh_token', this.refresh_token)
  }

}
