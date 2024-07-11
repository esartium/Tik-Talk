import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControlName } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { debounceTime, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
  
  profileService = inject(ProfileService);
  
  fb = inject(FormBuilder);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    username: [''],
    stack: ['']
  })

  constructor() {
    this.searchForm.valueChanges.pipe(
        startWith({}), // чтобы не стартовать с пустой страницы, передаём пустой объект параметров поиска; тогда стартанём со списка всех возможных анкет (это пайп из rxjs)

        debounceTime(300), // чтобы запросы не отправлялись на каждый пук (это пайп из rxjs)

        switchMap(formValue => {
            return this.profileService.profilesFilter(formValue); 
          }
        )
      ).subscribe();
  }
}
