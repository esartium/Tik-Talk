import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccounts() {
    return this.http.get(`${this.baseApiUrl}account/test_accounts`)
  }
}
