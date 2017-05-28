
angular.module('mainCtrl', []).controller('mainController', function mainController($scope, $http) {
	$scope.formData ={};
	$scope.selectedTab = 1; 
	$scope.completeExpense = {};

	// $scope.isActive(1) } "  ng-click="changeTabValue(1)
	$scope.isActive = function(value) {
		console.log("Inside is active ",value, $scope.selectedTab , (value == $scope.selectedTab ));
		return (value == $scope.selectedTab ) ;
	}

	$scope.changeTabValue = function(value) {
		console.log("changing selected tabbe value from ", $scope.selectedTab  ,"to ", value);
		$scope.selectedTab = value;
	}


	$http.get('jexpense/expenses')
		.then( function(response) {
			$scope.completeExpense = response.data;
		})
		.finally( function() {
			console.log("UI GET: hit completed"); 
		});
	
	
	$scope.createExpense = function() {

		$http.post('jexpense/expenses' , $scope.formData )
			.then( function(response) {
				$scope.completeExpense = response.data;
				console.log("UI POST: hit completed ");
			})
			.finally( function(){
				$scope.formData = {};
			});
	};

	$scope.deleteExpense  =  function(id) {
		$http.delete('jexpense/expenses'+ id) 
			.then( function(response) {
				console.log("UI DELETE: hit completed ", response.data);
				$scope.completeExpense = response.data;
			})
			.finally( function() {
				console.log("UI DELETE: hit completed 2");
			});
	};

});
