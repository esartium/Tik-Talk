import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor() {
    // пример, как можно сделать стрим:
    from([1, 2, 3, 4, 5, 6])
      .subscribe(val => {
        console.log(val)
      })
    // элементы массива выведутся по одному, как поток
  }

  authService: AuthService = inject(AuthService);

  // Делаем инстанс форм-группы
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit():void {
    
    if (this.form.valid) {
      console.log(this.form.value);

      // ангуляр ругается на this.form.value;
      // тут можно либо типизировать форму, лтбо заглушить ошибку:
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(res => console.log(res));
      // из-за subscribe в консоли будет отображаться результат запроса
    } else console.log('Неверный логин или пароль')
  }
}
