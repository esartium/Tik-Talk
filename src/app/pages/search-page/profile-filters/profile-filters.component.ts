import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControlName } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { Subscription, debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  
  profileService = inject(ProfileService);
  
  fb = inject(FormBuilder);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    username: [''],
    stack: ['']
  })

  searchFormSub!: Subscription

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges.pipe(
        startWith({}), // чтобы не стартовать с пустой страницы, передаём пустой объект параметров поиска; тогда стартанём со списка всех возможных анкет (это пайп из rxjs)

        debounceTime(300), // чтобы запросы не отправлялись на каждый пук (это пайп из rxjs)

        switchMap(formValue => {
            return this.profileService.profilesFilter(formValue); 
          }
        ),

        // Мы повесили обработчики, слушаем события; если мы уйдём на другую страницу, то обработчик всё ещё будет висеть там и слушать => -память; Решение проблемы, вариант первыый:
        // takeUntilDestroyed() // (ставится после всех остальных пайпов)
      )
      .subscribe();
  }

  // вариант второй:
  ngOnDestroy(): void {
    // сделать unsubscribe (для этого выше нцжно наш subscribe засунуть в переменную, а также имплементировать интерфейс)
    this.searchFormSub.unsubscribe();
  }

  // вариант третий: разные кастомные решения
}
