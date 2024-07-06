import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { tap } from 'rxjs';

// Декоратор
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // Инжектируем HttpClient (для этого надо импортировать эти штуки, см строчки 1,2)
  // Инжектируем - означает примерно "запрашиваем у ангуляра, просим ангуляр дать нам какую-то сущность"
  http = inject(HttpClient) 

  constructor() { }

  // вынесли в переменную базовый кусок url, который будет повторяться в каждом запросе
  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  getTestAccounts() { // метод получения всех профилей
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
    // такая запись называется "дженерик" (в метод гет мы передаём интерфейс; а внутри метода гет прописано, что если передан такой интерфейс, то метод гет вернёт соответствующий результат)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`).pipe(
      tap(
        res => console.log(res)
      )
    )
  }


}
