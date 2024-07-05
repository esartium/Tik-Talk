import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card', // название тега, который мы будем использовать, чтобы разместить этот компонент в родительском компоненте
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  // используем декоратор @Input
  @Input() profile?: Profile;
  // тут написано примерно это:
  // Input ожидает отправленные ему данные; он получит их и сохранит в profile;
  // Мы не знаем точно, придёт ли profile => ?;
  // Если придёт, то будет типом данных Profile

  // @Input() profile!: Profile; это бы означало: "Успокойся, ts, я точно уверен, что данные придут "
}
