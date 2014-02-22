var controllers = angular.module('controllers',[]);
  
controllers
  .controller('summaryCtrl', function($scope){
    $scope.summaryData = 'Summary';
  })
  .controller('agreementsCtrl', function($scope){
    $scope.agreementData = 'Agreements'
  });

var app = angular.module('portal', [
  'ngRoute',
  'controllers',
  'pageslide-directive'
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