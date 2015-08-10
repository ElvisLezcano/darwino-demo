(function() {
	var mod = angular.module('darwino.ionic', ['ionic']);

	// ShowWhen and HideWhen
	// Inpired from https://github.com/andrewmcgivery/ionic-ion-showWhen, MIT license
	function media(m) {
		if(m=="large") return "(min-width:768px)"
		return m;
	}
	function showhide($window,show) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attr) {
				function checkExpose() {
					var mq = media($attr[show?'showWhenMedia':'hideWhenMedia']);
					var matches = $window.matchMedia(mq).matches;
					var visible = (show && matches) || (!show && !matches);  
					if(visible){
						$element.removeClass('ng-hide');
					} else {
						$element.addClass('ng-hide');		
					}
				}
	
				function onResize() {
					debouncedCheck();
				}
	
				var debouncedCheck = ionic.debounce(function() {
					$scope.$apply(function(){
						checkExpose();
					});
				}, 300, false);
	
				checkExpose();
	
				ionic.on('resize', onResize, $window);
	
				$scope.$on('$destroy', function(){
					ionic.off('resize', onResize, $window);
				});
			}
		};
	}
	mod.directive('showWhenMedia', ['$window', function($window) {
		return showhide($window,true);
	}]);
	mod.directive('hideWhenMedia', ['$window', function($window) {
		return showhide($window,false);
	}]);

	// See if this is useful.
	mod.directive('showWhenState', ['$window','$state','$rootScope', function($window,$state,$rootScope) {
		return {
			restrict: 'A',
			link: function($scope, $element, $attr) {
				function checkExpose(){
					var state = $state.current.name;
					var statesToMatch = $attr.showWhenState.split(" || ");
					if(statesToMatch.indexOf(state) > -1){
						$element.removeClass('ng-hide');
					} else {
						$element.addClass('ng-hide');
					}
				}
			
				$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
					checkExpose();
				})
			
				checkExpose();
			}
		};
	}]);
	
})();