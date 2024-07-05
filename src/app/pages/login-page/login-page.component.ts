import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  // Делаем инстанс форм-группы
  form = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
  })

  onSubmit(event: Event):void {
    console.log(event)
  }
}
