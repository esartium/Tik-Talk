import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

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
      this.authService.login(this.form.value).subscribe();
      // если здесь добавить .subscribe(), то после запроса в консоли будет сообщение, если есть ошибка, а в network результат запроса будет отображаться и если ошибка есть, и если все норм
    } else console.log('Неверный логин или пароль')
  }
}
