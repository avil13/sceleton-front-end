###
# контроллер для управления меню админки
###
APP.controller 'MenuCtrl', ['$scope', '$routeParams',
    ($scope, $routeParams)->

        $scope.menu = [
            url: 'index'
            title: 'Главная'
        ,
            url: 'admin'
            title: 'Админка'
        ]

        $scope.hash = window.location.hash.toString().substr(2)
]
