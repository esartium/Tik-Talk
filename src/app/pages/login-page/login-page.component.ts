import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { from, map, take, skip, delay, tap } from 'rxjs';

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
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  onSubmit():void {
    
    if (this.form.valid) {
      console.log(this.form.value);

      // ангуляр ругается на this.form.value;
      // тут можно либо типизировать форму, лтбо заглушить ошибку:
      //@ts-ignore
      this.authService.login(this.form.value).subscribe()
      // тут в subscribe ничего не передано; с ответом произойдёт то, что мы указали в пайпе в сервисе
    } else console.log('Неверный логин или пароль')
  }
}
