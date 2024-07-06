import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    return this.http.post(`${this.baseApiUrl}token`, fd)
  }
}
