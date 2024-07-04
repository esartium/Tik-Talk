import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';

// Это декоратор (что-то вроде набора настроек для класса)
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent],
  templateUrl: './app.component.html', // указываем, какой html-шаблон у этого компонента
  styleUrl: './app.component.scss' // указываем, какой файл отвечает за стили этого компонента
})
export class AppComponent { // сам класс компонента
  title = 'tik-talk';
}
