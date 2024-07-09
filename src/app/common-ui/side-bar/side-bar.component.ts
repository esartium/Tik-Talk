import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SvgIconComponent, NgForOf],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
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
