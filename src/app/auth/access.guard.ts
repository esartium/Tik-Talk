// Раньше гарды реализовывались на классах; сейчас - функции

import { Router } from "@angular/router";
import { AuthService } from "./auth.service"
import { inject } from "@angular/core"

export const canActivateAuth = () => {
    // есть доступ, если выполняется:
    const isLoggedIn = inject(AuthService).isAuth;

    // если есть доступ:
    if (isLoggedIn) {
        return true;
    }
    // если нет доступа, перенаправляем на страницу авторизации:
    return inject(Router).createUrlTree(['/login']);

}