import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  ProfileService = inject(ProfileService);

  // ngOnInit() { // это один из live cycle hooks; означает выполнение какой-то функции при инициализации компонента (можно сказать, что при рендере)
  //   this.ProfileService.getMe().subscribe();
  // } // больше не нужен этот запрос, мы теперь такой же делаем в другом компоненте, два таких нам не надо
}
