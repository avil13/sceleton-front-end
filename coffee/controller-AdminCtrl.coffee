###
# Контроллер для страницы управления пользователями
###
APP.controller 'AdminCtrl', ['$scope', 'API',
    ($scope, API)->
        API.post 'users.json', (data)->
            $scope.users = data.content if data.content?


        $scope.actions =
            select: (user)->
                $scope.users.active = user

]