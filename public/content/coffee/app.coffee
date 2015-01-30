# добавляем SweetAlert
Swal = angular.module 'Swal', []
Swal.factory 'swal', ($window)->  $window.swal

# подключаем angularJS

APP = angular.module 'APP', ['ngRoute', 'Swal']

###
Config
###
APP.config ['$routeProvider',
    ($routeProvider)->
        $routeProvider
            .when '/index',
                templateUrl: 'template/index.html',
                controller: 'IndexCtrl'
            .when '/admin',
                templateUrl: 'template/admin.html',
                controller: 'AdminCtrl'
            .otherwise
                redirectTo: '/index'
]

