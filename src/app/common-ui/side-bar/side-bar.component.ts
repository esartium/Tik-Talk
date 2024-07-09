import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NgForOf } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SvgIconComponent, NgForOf, SubscriberCardComponent, JsonPipe, AsyncPipe, RouterLink],
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
      link: '' // корень сайта
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats' // корень сайта
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search' // корень сайта
    },
  ]
}
