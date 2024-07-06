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

  constructor() {
    // пример, как можно сделать стрим:
    from([1, 2, 3, 4, 5, 6]) // точка входа
    // как вставить какие-то промежуочные станции в этом потоке:
    // у любого стрима в rxjs есть метод pipe:
    .pipe( // в него мы передаём различные пробразователи
      map(val => { // это как метод массивов map, но у пайпа такие штуки называются операторами
        return val*10;
      }),
      take(4), // возьмём 4 значения, а дальше стрим закончится
      skip(2), // пропустим 2 первых значения, а дальше пойдёт стрим
      // от порядка применения методов результат меняется !!
      // delay(3000), // это задержка, как setTimeout
      tap(val => console.warn(val)), // нужно для сайд-эффектов; не повлият на значение val, просто какая-то работа с элементами массива, например, вывод
      tap(val => {
        this.form.patchValue({username: val.toString()})
      })
     )
     .subscribe(val => {
        console.log(val)
      })
    // элементы массива выведутся по одному, как поток
  }

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
      this.authService.login(this.form.value).subscribe(res => console.log(res));
      // из-за subscribe в консоли будет отображаться результат запроса
    } else console.log('Неверный логин или пароль')
  }
}
