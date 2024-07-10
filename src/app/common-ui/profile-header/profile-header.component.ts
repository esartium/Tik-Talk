import { Component, InputSignal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { input } from '@angular/core';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {

  // ещё один вариант, как сделать инпут (то же самое, как мы в других компонентах делали через декоратор @Input, но теперь он будет сигналом, а не просто переменной)
  profile: InputSignal<any> = input<Profile>()

}
