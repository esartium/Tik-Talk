// Раньше интерсепторы реализовывались на классах; сейчас - функции

import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";

let isRefreshing = false; // чтобы не попасть в петлю, запрос на рефреш будет проходить через интерсептор не так, как обычный

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
    // параметры:
    // request - это перехваченный интерсептором запрос
    // next - функция, чтобы отпустить запрос после того, как что-то с ним сделали

    // В этом интерсепторе будем добавлять заголовок авторизации к каждому запросу (посмотреть можно в консоли -> network -> любой запрос fetch/xhr -> headers)
    const access_token = inject(AuthService).access_token;
    const authService = inject(AuthService);
    
    if (!access_token) {
        return next(request);
    }

    if(isRefreshing) {
        return refreshAndProceed(authService, request, next);
    }

    return next(addToken(request, access_token)).pipe(
        catchError(err => {
            if (err.status === 403) { // ошибка 403 у этого бэка означает, что токен недействителен (сдох)
                return refreshAndProceed(authService, request, next) // возвращаем новый стрим, который сделаем сами; мы вынесли его в отдельную функцию
            }

            return throwError(err) // если ошибка не про токен, то просто возвращаем стрим с этой ошибкой
        })
    );

}

const refreshAndProceed = (authService: AuthService, request: HttpRequest<any>, next: HttpHandlerFn) => {
    if (!isRefreshing) {
        isRefreshing = true;

        return authService.refreshAuthToken().pipe(
            switchMap( // этот пайп меняет один стрим на другой
                // в данном случае:
                // мы делали какой-то запрос, его перехватил интерсептор.
                // пока запрос находился в интерсепторе, выяснилось, что токен сдох.
                // мы отправляем запрос на получение токена с бэка. этот запрос возвращает нам стрим с токеном.
                // с этого стрима нам нужно будет переключиться на другой стрим - ещё раз отправить запрос, такой же, из которого мы изначально попали в интерсепто, но с новым токеном
                (res) => { 
                    isRefreshing = false;

                    return next(addToken(request, res.access_token)) // тут токен можно было достать и не из res, а из authService
                    // то есть здесь мы отпустили запрос - сделали то, что надо было сделать с изначальным запросом, но теперь с новым токеном
                } 
            )
        )
    }

    return next(addToken(request, authService.access_token))

}

const addToken = (request: HttpRequest<any>, access_token: string | null) => {
    return request = request.clone(
        {
            setHeaders: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )
}





