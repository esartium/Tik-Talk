import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { from, map, take, skip, delay, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authService: AuthService = inject(AuthService);
  router = inject(Router);

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
      this.authService.login(this.form.value).subscribe( res => {
        // перенаправление при успешном запросе:
        this.router.navigate(['']);
        
        console.log(res)
      }
      )
      // если тут в subscribe ничего не передано, то с ответом произойдёт то, что мы указали в пайпе в сервисе
      // если в пайпе нет вывода, но есть, например, присваивание значения ответа переменной, а здесь вывод есть, то res будет выведен в консоли
    } else console.log('Неверный логин или пароль')
  }

  isPasswordVisible = signal<boolean>(false) // здесь в параметр кинули дефолтное значение
}
