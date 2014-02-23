var controllers = angular.module('controllers',[]);

controllers
.controller('summaryCtrl', function($scope){
    $scope.summaryData = 'Summary';
})
.controller('agreementsCtrl', function($scope){
    $scope.agreementData = 'Agreements';
    $scope.actionableAgreements = 8;
})
.controller('movementsCtrl', function($scope){

});

var app = angular.module('mockup', [
    'ngRoute',
    'controllers'
    ]);

app.factory('notificationService', function($q, $timeout){

    document.onkeydown = function(event) {
        var key_press = String.fromCharCode(event.keyCode);
        var key_code = event.keyCode;

        if(key_code == 65){
            agreementCount++;
            console.log(agreementCount);
        }
    }

    var agreementCount = 2;
    return{
        getAgreementCount: function(){
            var d = $q.defer();

            // $timeout(function(){
                d.resolve(agreementCount);
            // }, 1000);
            return d.promise;
        }
    };
});

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/summary',{
        templateUrl: 'partials/summary.html',
        controller: 'summaryCtrl'
    }).
    when('/agreements', {
        templateUrl: 'partials/agreements.html',
        controller: 'agreementsCtrl'
    }).
    when('/movements', {
        templateUrl: 'partials/movements.html',
        controller: 'movementsCtrl'
    });
}]);

app.directive('panelledWindow', function($rootScope, $timeout, $location, notificationService){
    return{
        link: function ($scope, el, attrs){

            var getAgreementCount = function(){
                $timeout(function(){
                    console.log('fired');
                     notificationService.getAgreementCount().then(function(data){
                        $scope.actionableAgreements = data;
                    })
                getAgreementCount()
                },5000);
            };

            $scope.$watch('actionableAgreements', function(newVal, oldVal){
                if(oldVal != undefined){
                    $scope.agreementsUpdate = true;
                    $timeout(function(){$scope.agreementsUpdate = false;}, 1000);

                    console.log("new:" + newVal + ', old: ' + oldVal);
                }
            });

            getAgreementCount();

            $scope.actionableMovements = 3;

            $scope.activePath = $location.$$url;
            $scope.activeRoute = function(name){
                return name == $scope.activePath;
            }

            $scope.$watch(function(){ return $location.$$url}, function(newVal, oldVal){
                var location = newVal;
                console.log(location);
            });

            $rootScope.$on('$locationChangeStart', function(event, nextLocation, currentLocation){
                splitPath = nextLocation.split('/');
                $scope.activePath = splitPath[splitPath.length -1];
                $scope.menuEvent(false);
            });

            $scope.showMenu = false;

            $scope.toggleMenu = function(){
                $scope.showMenu = !$scope.showMenu;
            }

            $scope.collapsed = false;

            $scope.collapsing = false;
            $scope.expanding = false;
            $scope.menuEvent = function(mouseEntered){
               // var timeout;
               
               //     if(mouseEntered){
               //      if(!$scope.collapsing && !$scope.expanding){
               //          $scope.expanding = true;
               //         timeout = $timeout(function(){
               //             $scope.collapsed = false;
               //             $scope.expanding = false;
               //         }, 600);
               //     }
               //     } else{
               //          $timeout.cancel(timeout);
               //         $scope.collapsed = true;
               //         $scope.collapsing = true;
               //         $timeout(function(){
               //             $scope.collapsing = false;
               //         }, 500);
               //     }
               
           };
       }
   }
});