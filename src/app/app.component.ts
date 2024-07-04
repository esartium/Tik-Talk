import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

// Это декоратор (что-то вроде набора настроек для класса)
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, JsonPipe],
  templateUrl: './app.component.html', // указываем, какой html-шаблон у этого компонента
  styleUrl: './app.component.scss' // указываем, какой файл отвечает за стили этого компонента
})
export class AppComponent { // сам класс компонента
  
  // запрашиваем у ангуляра (инжектируем) созданный нами сервис
  profileService = inject(ProfileService)
  // теперь в этой переменной сохранён инстанс этого сервиса

  profiles: any = []; // указание здесь типа any уберёт ошибку, но вообще так не надо делать (*); как надо - показано в следующем коммите

  constructor() {

    this.profileService.getTestAccounts()
    .subscribe(value => {
      this.profiles = value
    })
    // subscribe ~~= "подписаться на ответ"

  }

}
