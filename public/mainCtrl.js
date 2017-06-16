
angular.module('mainCtrl', []).controller('mainController', function mainController($scope, $http) {
	$scope.formData = {};
	$scope.selectedTab = 1;
	$scope.completeExpense = {};
		
	// $scope.today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	


	// $scope.isActive(1) } "  ng-click="changeTabValue(1)
	$scope.isActive = function (value) {
		//	console.log("Inside is active ", value, $scope.selectedTab, (value == $scope.selectedTab));
		return (value == $scope.selectedTab);
	}

	$scope.changeTabValue = function (value) {
		$scope.formData= {};
		//	console.log("changing selected tabbe value from ", $scope.selectedTab, "to ", value);
		$scope.selectedTab = value;
	}


	$http.get('jexpense/expenses')
		.then(function (response) {
			$scope.completeExpense = response.data;
		})
		.finally(function () {
			console.log("UI GET: hit completed");
		});


	$scope.createExpense = function () {

		$http.post('jexpense/expenses', $scope.formData)
			.then(function (response) {
				$scope.completeExpense = response.data;
				//console.log("UI POST: hit completed ");
			})
			.finally(function () {
				$scope.formData = {};
			});
	};

	$scope.updateExpense = function (expense) {
		$scope.selectedTab = 2;
		//console.log(expense);
		$scope.formData = expense;
	};

	$scope.deleteExpense = function (id) {
		$http({
			method: 'DELETE',
			url: 'jexpense/expenses',
			data: {
				_id: id
			},
			headers: {
				'Content-type': 'application/json;charset=utf-8'
			}
		})
			.then(function (response) {
				//console.log(response.data);
				$scope.completeExpense.forEach(function (expense, index) {
					if (expense._id === id) {
						$scope.completeExpense.splice(index, 1);
					}
				}, this);

			}, function (rejection) {
				console.log(rejection.data);
			});
	}

});
