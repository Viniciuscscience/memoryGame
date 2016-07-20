var memory = angular.module("memory", []);

memory.filter('timeDigit', [function () {
	return function (input) {
		return input < 10  ? '0'+input:input;
	};
}]);

memory.controller("mainCtrl", function($scope, $timeout, $window){
	$scope.currentLevel = 1;

	$scope.initCounter = function(){
		$scope.timeProm = $timeout(function() {
			$scope.gamesecond = (1 +$scope.gamesecond)%60;
			if($scope.gamesecond == 0){
				$scope.gameminute++;
			}
			$scope.initCounter();
		}, 1000);
	}


	$scope.initialize = function(m,n){
		if(m%2 !=0 || n%2!=0) throw "A matriz precisa ter uma quantidade par de elementos";
		$scope.gameFull = (m*n)/2;
		$scope.gameWin = false;
		$scope.gamesecond = 0;
		$scope.gameminute= 0;
		$scope.gameRight = 0;
		$scope.gameWrong = 0;
		$scope.choose = [-1,-1];
		$scope.initCounter();
		var totalElements = m*n / 2;
		var elements = [
			"sandshrew.png",
			"chikorita.png",
			"crab.gif",
			"cubone.png",
			"hitmonchan.png",
			"snorlax.png",
			"togepi.jpg",
			"zoobat.png",
			"ekans.png",
			"pikachu.png",
			"tauros.gif",
			"psyduck.png",
			"onix.png",
			"lapras.png",
			"katerpi.png",
			"guiarados.png",
			"blastoise.gif",
			"dragonite.png"
		];
		var usable = [];
		for(var i=0; i < totalElements; i++){
			usable.push(elements[i]);
			usable.push(elements[i]);
		}
		$scope.game = [];
		$scope.gameTurned = [];

		for(var i = 0; i < m; i++){
			$scope.game.push([]);
			$scope.gameTurned.push([]);
			for(var j = 0; j < n; j++) {
				$scope.game[i][j] = usable.splice(Math.floor(Math.random()*usable.length),1)[0];
				$scope.gameTurned[i][j] = true;
			}
		}

		$timeout(function(){
			for(var i = 0; i < m; i++){
				for(var j = 0; j < n; j++) {
					$scope.gameTurned[i][j]=false;
				}
			}
		},m*n*500);

	};

	$scope.initialize($scope.currentLevel*2,$scope.currentLevel*2);

	$scope.restartGame = function(){
		if($scope.currentLevel<4)
		$scope.currentLevel++;
		$scope.initialize($scope.currentLevel*2,$scope.currentLevel*2);
	}

	$scope.setOption = function(line,colum){
		if(!$scope.gameTurned[line][colum]){
			if($scope.choose[0] == -1 ){
				$scope.gameTurned[line][colum] = true;
				$scope.choose[0] = line;
				$scope.choose[1] = colum;
			}else{
				$scope.gameTurned[line][colum] = true;
				$timeout(function() {
					if($scope.game[$scope.choose[0]][$scope.choose[1]] != $scope.game[line][colum]){
						$scope.gameTurned[$scope.choose[0]][$scope.choose[1]] = false;
						$scope.gameTurned[line][colum] = false;
						$scope.gameWrong++;
					}else{
						$scope.gameRight++;
						if($scope.gameFull == $scope.gameRight){
							$scope.gameWin = true;
							$timeout.cancel($scope.timeProm);
						}
					}
					$scope.choose[0] = -1;
				}, 500);
			}
		}

	}

});
