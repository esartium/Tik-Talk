import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';

  login(payload: {username: string, password: string}) {
    // В этом методе на бэке принимаются данные не в привычном json, а в x-www-form-urlencoded
    // Как перевести их в этот формат:
    const fd: FormData = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd) // пока мы не указали тут <TokenResponse>, VScode предлагал после res. обычные методы объекта (типа res - это просто какой-то объект, хз какой); после указания - предлагает поля ответа, которые мы прописывали в интерфейсе
      .pipe(
        tap(
          res => console.log("access_token: ", res.access_token, "refresh_token: ", res.refresh_token)
        )
      )
  }
}
