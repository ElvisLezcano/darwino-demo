/*!COPYRIGHT HEADER! - CONFIDENTIAL 
 *
 * Darwino Inc Confidential.
 *
 * (c) Copyright Darwino Inc 2014-2015.
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.     
 */

var jstore = darwino.jstore;
var services = darwino.services;

var jstore_baseUrl = "$darwino-jstore";
var social_baseUrl = "$darwino-social";

var session = jstore.createRemoteApplication(jstore_baseUrl).createSession();
var userService = services.createUserService(social_baseUrl+"/users");

// Enable some logging
var LOG_GROUP = "discdb.web";
darwino.log.enable(LOG_GROUP,darwino.log.DEBUG)

var DATABASE_NAME = "domdisc";
var STORE_NAME = "nsfdata";

angular.module('discDb', [ 'ngSanitize','ionic', 'darwino.ionic', 'darwino.angular.jstore', 'angular-quill' ])

.run(function($rootScope,$location,$state,$http,entries) {
	// Make some global var visible
	$rootScope.darwino = darwino;
	$rootScope.session = session;
	$rootScope.userService = userService;

	$rootScope.database = $rootScope.session.getDatabase(DATABASE_NAME);
	$rootScope.nsfdata = $rootScope.database.getStore(STORE_NAME);

	$rootScope.entries = entries;
	
	$rootScope.isAnonymous = function() {
		return userService.getCurrentUser().isAnonymous();
	};
	$rootScope.isReadOnly = function() {
		return this.isAnonymous();
	};
	$rootScope.isFtEnabled = function() {
		return $rootScope.nsfdata.isFtSearchEnabled();
	};
	$rootScope.go = function(path) {
		$location.path(path);
	};
	$rootScope.apply = function() {
		setTimeout(function(){$rootScope.$apply()});
	};
	
	$rootScope.displayUser = function(dn) {
        $state.go('disc.user',{userdn:dn});
    }	
	
	$rootScope.isState = function(state) {
        return $state.is(state);
    }	
	
	darwino.hybrid.addSettingsListener(function(){
		$rootScope.apply();
	});
	
	
})

.filter('formattedDate', function() {
	return function(d) {
		return d ? moment(d).fromNow() : '';
	}
})

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('disc', {
		url : "/disc",
		abstract : true,
		templateUrl : "templates/discdb.html"
	}).state('disc.home', {
		url : "/home",
		views : {
			'menuContent' : {
				templateUrl : "templates/home.html"
			}
		}
	}).state('disc.byDate', {
		url : "/bydate",
		views : {
			'menuContent' : {
				templateUrl : "templates/bydate.html",
				controller : "ByDateCtrl"
			}
		}
	}).state('disc.readpost', {
		url : "/readpost",
		views : {
			'menuContent' : {
				templateUrl : "templates/readpost.html",
				controller : "ReadCtrl"
			}
		}
	}).state('disc.editpost', {
		url : "/editpost/:id",
		views : {
			'menuContent' : {
				templateUrl : "templates/editpost.html",
				controller : "EditCtrl"
			}
		}
	}).state('disc.user', {
		url : "/user/:userdn",
		views : {
			'menuContent' : {
				templateUrl : "templates/user.html",
				controller : "UserCtrl"
			}
		}
	});

	$urlRouterProvider.otherwise("/disc/bydate");
})

.controller('MainCtrl', function($scope) {
})

// This is currently a service as the left menu needs access to the count
// let's think about a better architecture here
.service('entries', function($rootScope,$http,$timeout,$jstore) {
	var entries = $jstore.createItemList(session,DATABASE_NAME,STORE_NAME)
	
	// Specific methods
	entries.getUserDn = function(item) {
		return item ? item.value.from : null;
	}
	entries.getUser = function(item) {
		return item ? userService.findUser(item.value.from,function(u,n){if(n){$rootScope.apply()}}) : darwino.services.User.ANONYMOUS_USER;
	}
	entries.getPhoto =  function(item) {
		return item ? userService.getUserPhotoUrl(item.value.from) : null;
	}
	entries.newPost = function() {
		$rootScope.go('/disc/editpost/new');
	}
	entries.editPost = function(item) {
		$rootScope.go('/disc/editpost/id:'+item.unid);
	}
	entries.newComment = function(item) {
		$rootScope.go('/disc/editpost/pid:'+item.unid);
	}
	return entries;
})

//
//	By Date
//
.controller('ByDateCtrl', ['$scope','$rootScope','$http','$ionicModal','entries', function($scope,$rootScope,$http,$ionicModal,entries) {
	console.log('ByDateCtrl START');
	
	//
	//
	//
	$scope.hasMore = function() {
		return entries.hasMore();
	}
	$scope.loadMore = function() {
		entries.loadMore( function() {
			$scope.$broadcast('scroll.infiniteScrollComplete');
			console.log('scroll.infiniteScrollComplete!');
			//$scope.$broadcast('scroll.resize');
		});
	}
	$scope.refresh = function() {
		entries.refresh( 0, function() {
			darwino.hybrid.setDirty(false);
			$scope.$broadcast('scroll.refreshComplete');
			console.log('scroll.refreshComplete!');
		});
	}
	
	//
	// Search Bar
	//
	$scope.searchMode = 0;
	$scope.startSearch = function() {
		$scope.searchMode = 1;
	};
	$scope.executeSearch = function() {
		entries.refresh(500);
	};
	$scope.cancelSearch = function() {
		$scope.searchMode = 0;
		if(entries.ftSearch) {
			entries.ftSearch = "";
			entries.refresh();
		}
	};
	
	// Initialize the data
	$scope.refresh();
	console.log('ByDateCtrl END');
		
}])


//
//	Reader
//
.controller('ReadCtrl', ['$scope','$stateParams','$ionicHistory','entries', function($scope,$stateParams,$ionicHistory,entries) {
}])


//
//	Editor
//
.controller('EditCtrl', ['$scope','$stateParams','$ionicHistory','entries', function($scope,$stateParams,$ionicHistory,entries) {
	// Should we make this async?
	var id = $stateParams.id;
	if(id && darwino.Utils.startsWith(id,'id:')) {
		$scope.doc = $scope.nsfdata.loadDocument(id.substring(3));
	} else {
		$scope.doc = $scope.nsfdata.newDocument();
		if(id && darwino.Utils.startsWith(id,'pid:')) {
			$scope.doc.setParentUnid(id.substring(4));
		}
	}
	$scope.json = $scope.doc.getJson();
	
	$scope.submit = function() {
		var doc = $scope.doc;

		var isNew = doc.isNewDocument();
		doc.save();
		if(isNew && !doc.getParentUnid()) {
			entries.loadOneItem(doc.getUnid());
		} else {
			var root = entries.findRoot(doc.getParentUnid()||doc.getUnid());
			if(root) {
				entries.reloadItem(root); // All hierarchy...
			}
		}
		$ionicHistory.goBack();
	}

	$scope.cancel = function() {
		$ionicHistory.goBack();
	}
	
	$scope.getTitle = function() {
		var doc = $scope.doc;
		if(doc.getParentUnid()) {
			return doc.isNewDocument() ? "New Comment" : "Edit Comment";
		} else {
			return doc.isNewDocument() ? "New Post" : "Edit Post";
		}
	}
}])


//
//	User
//
.controller('UserCtrl', ['$scope','$stateParams','entries', function($scope,$stateParams,entries) {
	$scope.userAttr = "";
	$scope.userPayload = "";
	$scope.userConnAttrs = "";
	$scope.userConnPayload = "";

	$scope.user = userService.findUser($stateParams.userdn, function(user,read) {
		if(read) {
			$scope.user = user;
			$scope.$apply();
		}
	});
}]);
