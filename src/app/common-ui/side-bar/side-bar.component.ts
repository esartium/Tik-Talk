import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NgForOf } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { Profile } from '../../data/interfaces/profile.interface';
import { signal } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SvgIconComponent, NgForOf, SubscriberCardComponent, JsonPipe, AsyncPipe, RouterLink, ImgUrlPipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList(); // $ означает, что это стрим

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me' 
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats' 
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search' 
    },
  ];

  // me = this.profileService.me; // тут me - просто переменная; без реативности ангуляр не захочет отрисовывать её значение
  // но отрисует, если мы сделаем её сигналом:
  me = this.profileService.me;

  ngOnInit() {
    // если мы делаем subscribe, нам всегда надо делать un subscribe;
    // так же, как и необходимо делать clearTimeout, clearInterval, removeEventListener ("прибираться" за собой, чтобы не было утече памяти);

    // как можно сделать без сабскрайба, чтобы не надо было париться с отпиской:
    firstValueFrom(this.profileService.getMe()) // мы получим промис
  }
}
