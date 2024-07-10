import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { tap } from 'rxjs';
import { Pageble } from '../interfaces/pageble.interface';
import { map } from 'rxjs';

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

  me = signal<Profile | null>(null); // в эту переменную после авторизации будем помещать информацию об авторизованном юзере (только это не просто переменная, а сигнал)

  getMe() { // получаем данные своего профиля
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`).pipe(
      tap( (res: Profile) => {
        this.me.set(res);
        console.log(res);
      }
      )
    )
  }

  getAccount(id: string) { // получаем данные нужного профиля по id
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribersShortList(subsAmount:number = 3) { // получаем краткий список подписчиков для сайдбара
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map( // использовали, чтобы вывести только items без служебной инфы про пагинацию
          res => res.items.slice(0,subsAmount) // slice тут, чтобы вывести только первые 3 элемента
        )
      )
  }

  patchProfile(profile: Partial<Profile>) { // Редактирование профиля; Partial значит, что не обязательно должны прийти все поля из Profile
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`,
      profile
    )
  }

}
