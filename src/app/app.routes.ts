import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';

// Routes - это массив объектов, представляющих собой путь до страницы + компонент этой страницы
export const routes: Routes = [

    // для создания дочернего роутера:
    {path: '', component: LayoutComponent, children: [
        {path: '', component: SearchPageComponent},
        {path: 'profile', component: ProfilePageComponent}
    ]},
    
    {path: 'login', component: LoginPageComponent},
];

// по умолчанию роуты работать не будут;
// чтобы происходил роутинг, нужен тег <router-outlet>;
// если этот тег есть, то ангуляр уже смотрит в конфигурацию роутов и рендерит, что надо.
