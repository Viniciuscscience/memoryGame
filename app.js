var memory = angular.module("memory", []);

memory.controller("mainCtrl", function($scope, $timeout, $window){
	$scope.gamesecond = 0;
	$scope.gameminute= 0;

	$scope.choose = [{line: -1, colum: -1},{line: -1, colum: -1}];
	$scope.gameWin = false;
	

	$scope.game = [['A','D','C','T'],['T','E','D','B'],['A','M','C','E'],['F','B','M','F']];
	$scope.gameTurned = [[false,false,false],[false,false,false],[false,false,false],[false,false,false]];

	$scope.gameFull = ($scope.game.length * $scope.game[0].length)/2;

	$scope.gameRight = 0;
	$scope.gameWrong = 0;

	$scope.setOption = function(line,colum){

		if($scope.choose[0].line == -1){
			$scope.choose[0].line = line;
			$scope.choose[0].colum = colum;

			$scope.gameTurned[$scope.choose[0].line][$scope.choose[0].colum] = true;
			$scope.choose[1].line = -1;
			$scope.choose[1].colum = -1;
		}else if($scope.choose[1].line == -1 ){

			$scope.choose[1].line = line;
			$scope.choose[1].colum = colum;
			$scope.gameTurned[$scope.choose[1].line][$scope.choose[1].colum] = true;
			$timeout(function() {
			var aux = [{line: $scope.choose[0].line, colum: $scope.choose[0].colum},{line: $scope.choose[1].line, colum: $scope.choose[1].colum}];

					if($scope.game[$scope.choose[0].line][$scope.choose[0].colum] != $scope.game[$scope.choose[1].line][$scope.choose[1].colum]){
						$scope.gameTurned[aux[0].line][aux[0].colum] = false;
						$scope.gameTurned[aux[1].line][aux[1].colum] = false;

						$scope.gameWrong++;
				
					}else{
						$scope.gameRight++;
						if($scope.gameFull == $scope.gameRight){
							$scope.gameWin = true;
							$timeout.cancel($scope.timeProm);
						}

					}
					$scope.choose[0].line = -1;
					$scope.choose[0].colum = -1;

				}, 500);
			
		}

	}

	$scope.initCounter = function(){
		$scope.timeProm = $timeout(function() {
			$scope.gamesecond = (1 +$scope.gamesecond)%60;
			if($scope.gamesecond == 0){
				$scope.gameminute++;
			}

			
			
			$scope.initCounter();
		}, 1000);

	}
	$scope.initCounter();

	$scope.restartGame = function(){
		console.log("as");
		$window.location.reload();
	}


});