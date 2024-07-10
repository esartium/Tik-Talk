import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../../common-ui/side-bar/subscriber-card/subscriber-card.component';
import { PostFeedComponent } from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [PostFeedComponent, ProfileHeaderComponent, AsyncPipe, ImgUrlPipe, RouterLink, SvgIconComponent, SubscriberCardComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);

  // получаем переменную id из url, чтобы показывать профиль нужного юзера:
  
  // получили текущий роут:
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me); // конвертация сигнала в observable (типа стрим)

  // получаем поток параметров из роута и применяем к нему пайп:
  // (!) поток парамтеров тут выглядит так: мы не перезагружаем страницу (у нас же SPA), тыкаем на ссылки разных профилей с разными id, и эти id все летят сюда
  profile$ = this.route.params.pipe(
    switchMap( ({id}) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  )

  subscribers$ = this.profileService.getSubscribersShortList(5);
}
