import { Component, inject } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, JsonPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  // запрашиваем у ангуляра (инжектируем) созданный нами сервис
  profileService = inject(ProfileService)
  // теперь в этой переменной сохранён инстанс этого сервиса

  profiles: Profile[] = [];

  constructor() {

    this.profileService.getTestAccounts()
    .subscribe(value => {
      this.profiles = value
    })
    // subscribe ~~= "подписаться на ответ"

  }
}
