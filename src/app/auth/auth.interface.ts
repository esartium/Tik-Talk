
// Типизация для полей ответа сервера (пишем тут поля, которые ожидаем от него получить)
export interface TokenResponse {
    access_token: string,
    refresh_token: string
}