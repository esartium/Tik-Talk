// Раньше интерсепторы реализовывались на классах; сейчас - функции

import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from "rxjs";

let isRefreshing$ = new BehaviorSubject<boolean>(false); 
// BehaviorSubject - некий гибрид между стримом и сигналом;
// Мы можем как подписаться на него (а значит, можем использовать pipe), так и в любой момент получить значение без подписки
// у сигналов установить значение - что-то.set(блаблабла), а у этой штуки - isRefreshing$.next(блаблабла)

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

    if(isRefreshing$.value) {
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
    if (!isRefreshing$.value) {
        isRefreshing$.next(true);

        return authService.refreshAuthToken().pipe(
            switchMap( // этот пайп меняет один стрим на другой
                // в данном случае:
                // мы делали какой-то запрос, его перехватил интерсептор.
                // пока запрос находился в интерсепторе, выяснилось, что токен сдох.
                // мы отправляем запрос на получение токена с бэка. этот запрос возвращает нам стрим с токеном.
                // с этого стрима нам нужно будет переключиться на другой стрим - ещё раз отправить запрос, такой же, из которого мы изначально попали в интерсепто, но с новым токеном
                (res) => { 
                    isRefreshing$.next(false);

                    return next(addToken(request, res.access_token)) // тут токен можно было достать и не из res, а из authService
                    // то есть здесь мы отпустили запрос - сделали то, что надо было сделать с изначальным запросом, но теперь с новым токеном
                } 
            )
        )
    }

    // Тут была такая логика:
    // если !isRefreshing, то рефрешим; если isRefreshing, то запрос просто проходит дальше:
    // return next(addToken(request, authService.access_token))
    //  А теперь мы хотим, чтобы запросы не шли дальше, а ждали рефреша токена, пока ждут, копились, и только потом выполнялись

    if (request.url.includes('refresh')) return next(addToken(request, authService.access_token));

    return isRefreshing$.pipe(
        filter(isRefreshing => !isRefreshing),
        switchMap(res => {
            return next(addToken(request, authService.access_token)).pipe(
                tap(() => {
                    isRefreshing$.next(false)
                })
            )
        })
    )
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





