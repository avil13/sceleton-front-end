# sceleton-front-end

подготовленные файлы для быстрого старта разработки фронтенд страницы на AngulsrJS + Bootstrap.

* [Быстрый старт](#fast)
* [Вообще быстрый старт](#wery_fast)


* * *

###### Fast
### Быстрый старт

```bash
git clone git@github.com:avil13/sceleton-front-end.git
cd sceleton-front-end
npm install
bower install

```

Установятся angular, angular-route, bootstrap 3, sweetalet.

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


* * *

###### wery_fast

### Вообще быстрый старт


Либо можно использовать этот репозиторий для автоматического создания быстрого скелета приложения.

**Как это сделал я.**

[Скачал файл](https://raw.githubusercontent.com/avil13/sceleton-front-end/master/setup.sh)

Сохранил в домашнюю директорию. Добавил на него алиас.

К примеру 

```bash 
alias Empty='~/setup.sh'
```

Теперь находясь в папке в которой хотим создать новый проект в консоли вбиваем команду:

```bash
Empty
```

И у нас там создасться папка с проектом и уже будут установлены все зависимости и node модули.


Если же мы хотим сразуже задать новой папке название, к примеру **myProject**

То вводим 

```bash
Empty myProject
```

Будет создана папка с **myProject** и в ней так же будут установлены все модули и библиотеки.



* * *

#### P.S.

Все вышеописанное делалось с установленными

* git
* node.js
* npm
* bower
* gulp

И выполнялось на лунуксе и маке.









