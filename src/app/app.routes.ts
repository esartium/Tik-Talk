import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

// Routes - это массив объектов, представляющих собой путь до страницы + компонент этой страницы
export const routes: Routes = [
    {path: '', component: SearchPageComponent},
    {path: 'login', component: LoginPageComponent}
    // пустой путь - это корень сайта
];

// по умолчанию роуты работать не будут;
// чтобы происходил роутинг, нужен тег <router-outlet>;
// если этот тег есть, то ангуляр уже смотрит в конфигурацию роутов и рендерит, что надо.
