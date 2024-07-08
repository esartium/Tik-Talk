# Начало работы с angular

1) Установка Node.js

2) Установка CLI (command line interface):

```
sudo npm install -g @angular/cli
```

###### ! 

Посмотреть версию:

```
ng v
```

3) Создание нового angular-проекта:

```
ng new название-папки-в-которой-будет-проект
```

Среди файлов, созданных фреймворком, будет README.md со следующим содержимым:

#### TikTalk

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

##### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

##### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

##### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

##### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

##### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

##### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## ! 

блаблабла.spec.ts (красный ts) - файл с тестами; можно удалить.

## Генерация компонента через командную строку

Пример:

```
ng g c common-ui/profile-card
```

Здесь:
+ ng 
+ g - генерация
+ c - component
+ путь к папке, куда мы хотим положить компонент
+ /
+ название компонента (будет использовано в названиях файлов этого компонента)

В этом примере у нас будет создано 4 файла:

+ profile-card.component.html
+ profile-card.component.scss
+ profile-card.component.spec.ts
+ profile-card.component.ts

Тесты можно удалить вручную.

Чтобы файл тестов изначально не создавался, в angular.json:

```
"@schematics/angular:component": {
        блаблабла,
        "skipTests": true,
        блаблабла ....
        }
```

## Сервисы

В angular вся работа с сервером выносится в отдельные сущности, называемые сервисами.

Для них создаём отдельную папку. Сервис в папке app/data/services можно создавать как вручную (просто файлик), так и через cli:

```
ng g s data/services/название-сервиса
```

Сервис - класс, в котором мы будем описывать методы для общения с бэкендом. 

## Пайпы

Генерация пайпа в командной строке:

```
ng g p helpers/pipes/имя-пайпа
```

## Сайд-бар

Хотим сделать сайд-бар, который будет на всех страницах, кроме страницы авторизации (login).

Это можно сделать 2 способами:

+ Просто добавить ко всем компонентам, кроме страницы авторизации;

+ Через роутинг (добавление layout), как в этом коммите.

```
ng g c common-ui/layout
```

## Формы

+ реактивные (в этом проекте используем их; да и вообще чаще всего используются именно они)

+ шаблонные

## RxJs

Библиотека для реактивного программирования

Данные представлены в виде стримов (потоков данных); они летят, а мы их ловим и что-то с ними делаем. Аналогия - машина Голдберга или конвейер: данные проходят по этому конвейеру через различные действия, и мы эти действия описываем, а на выходе с конвейера получается что-то готовое.

Установка:

```
npm install rxjs
```

Точка входа - кусок данных, который поступает на конвейер.

## Гарды

(Стражники) отвечают за то, чтобы "защитить" какой-то роут, то есть не пустить туда того, кто не должен иметь к нему доступ.

## Куки

В куках будем хранить токен (чтобы авторизованного пользователя при, например, перезагрузке страницы, не выкидывало снова на страницу авторизации)

Библиотека для работы с куками в ангуляре:

```
npm install ngx-cookie-service --save
```

Чтобы снова стать неавторизованным, надо будет либо использовать соответствующую кнопку (напишем сами), либо в браузере почистить куки (в хроме через настройки).

## Интерсепторы

То же, что и middleware (перехватчик, через которого проходит запрос между фронтендом и бэком)

## refresh token

Спустя какое-то время токен, с которым мы авторизовались, перестаёт быть валиден. Нужно периодически проверять его валидность, и если токен протух, то рефрешить его в интерсепторе.