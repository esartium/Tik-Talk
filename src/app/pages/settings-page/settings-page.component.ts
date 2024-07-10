import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControlName } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

  // другой способ создания форм (делаем ту же FormGroup, но с помощью FormBuilder):
  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required], // disabled - нельзя менять поле
    description: [''],
    stack: ['']
  })

  profileService = inject(ProfileService);

  constructor() {
    effect(() => { // effect будет запускать эту функцию каждый раз, когда любой из сигналов внутри этой функции поменяется
      //@ts-ignore
      this.form.patchValue({ // тут делаем изначальное заполнение формы
        ...this.profileService.me(), 
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      });
    })
  }
   
  onSave() {
    // это:
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    // делаем, чтобы при сохранении все поля считались touched, и все валидаторы отработали, и всё ещё раз перепроверилось

    if(this.form.invalid) return;

    // @ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))
  }

  splitStack(stack: string | null | string[] | undefined) { // сплит строки со стеком на массив (по запятой)
    if (!stack) return [];

    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | string[] | undefined) { // слепим стек в строку, чтобы выводить в поле формы (по запятой)
    if (!stack) return '';
    
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
  
}
