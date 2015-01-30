<!doctype html>
<html lang="en" ng-app="APP">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>PAC 2.2</title>

    <link rel="stylesheet" href="bower_components/sweetalert/lib/sweet-alert.css">
    <link rel="stylesheet" href="css/style.css">

    <script src="bower_components/sweetalert/lib/sweet-alert.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="js/script.js"></script>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-18">
                <div class="row">
                    <ng-view></ng-view>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>