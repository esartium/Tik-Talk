// Раньше интерсепторы реализовывались на классах; сейчас - функции

import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
    // параметры:
    // request - это перехваченный интерсептором запрос
    // next - функция, чтобы отпустить запрос после того, как что-то с ним сделали

    // В этом интерсепторе будем добавлять заголовок авторизации к каждому запросу (посмотреть можно в консоли -> network -> любой запрос fetch/xhr -> headers)

    const access_token = inject(AuthService).access_token;

    if (!access_token) {
        return next(request);
    }
    
    request = request.clone(
        {
            setHeaders: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )

    return next(request);
}







