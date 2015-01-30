# sceleton-front-end

подготовленные файлы дял быстрого старта разработки фронтенд страницы

#### быстрый старт

```bash
git clone git@github.com:avil13/sceleton-front-end.git
cd sceleton-front-end
npm install
bower install

```

Установятся angular, angular-route, bootstrap 3.

Скрипты изначально писались на coffee-script и лежат в папке 
```
public/content/coffee/
```

Стили берутся из less файла bootstrap.

И что бы это все нормально собиралось используем **Gulp**.

В корне папки 

**gulp less** - для сборки CSS из Less файлов.

**gulp coffee** - для сборки js файлов и coffee файлов в один файл

**gulp relise** - вышеизложенное вмести плюс минификация

**gulp watch** - для наблюдения и  компиляции less и coffee задач

