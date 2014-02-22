var controllers = angular.module('controllers',[]);

controllers
    .controller('summaryCtrl', function($scope){
        $scope.summaryData = 'Summary';
    })
    .controller('agreementsCtrl', function($scope){
        $scope.agreementData = 'Agreements'
    });

var app = angular.module('mockup', [
    'ngRoute',
    'controllers'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/summary',{
            templateUrl: 'partials/summary.html',
            controller: 'summaryCtrl'
        }).
        when('/agreements', {
            templateUrl: 'partials/agreements.html',
            controller: 'agreementsCtrl'
        })
}]);

app.directive('panelledWindow', function($timeout){
    return{
        link: function ($scope, el, attrs){

            $scope.showMenu = false;

            $scope.toggleMenu = function(){
                $scope.showMenu = !$scope.showMenu;
            }

            $scope.collapsed = false;

            $scope.collapsing = false;
//            $scope.menuEvent = function(mouseEntered){
//                if(!$scope.collapsing){
//                    if(mouseEntered){
//                        $timeout(function(){
//                            $scope.collapsed = false;
//                        }, 500);
//                    } else{
//                        $scope.collapsed = true;
//                        $scope.collapsing = true;
//                        $timeout(function(){
//                            $scope.collapsing = false;
//                        }, 400);
//                    }
//                }
//            };
        }
    }
});