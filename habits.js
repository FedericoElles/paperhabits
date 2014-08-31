angular.module('PaperHabits', ['pascalprecht.translate',
                               'ngGSpreadsheet',
                               'pubnub.angular.service'])
    .config(['$translateProvider', function($translateProvider) {
      $translateProvider.useLoader('googleSpreadsheetLoader', {
        id: '1-NlVCXRNeLTc4YTyvChdGGlNnXsqqIvc96Rzltcm-kU', //ADD MISSING INFORMATION HERE
        sheet: 1
      })

      .registerAvailableLanguageKeys(['en', 'de'], {
        'en_US': 'en',
        'en_UK': 'en',
        'de_DE': 'de',
        'de_CH': 'de'
      })
      .determinePreferredLanguage();

    }])
    .run(function($rootScope, $translate, PubNub, translationBuffer){

      //connect to PubNub
      PubNub.init({
        subscribe_key: 'sub-c-7c524646-313d-11e4-9846-02ee2ddab7fe',
        publish_key: 'pub-c-57fde7c8-7b82-4124-8b49-b657e117337b'
      });

      //Subscribe to 'translate' channel
      PubNub.ngSubscribe({ channel: 'translate' });

      //Update translation on message
      $rootScope.$on(PubNub.ngMsgEv('translate'), function(ngEvent, payload) {
        var params = payload.message.split('___');

        //console.log('New Translation arrived:', payload.message, params);
        //Update translation Buffer with new translation value
        translationBuffer.update(params[0], params[1], params[2]);

        //Tell angular-translate to fetch new translations from 
        $translate.refresh();
      });


    })
    .controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $translate) {
  $scope.doPrint=false;

  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };

	var months = new Array(12);
	months[0] = "January";
	months[1] = "February";
	months[2] = "March";
	months[3] = "April";
	months[4] = "May";
	months[5] = "June";
	months[6] = "July";
	months[7] = "August";
	months[8] = "September";
	months[9] = "October";
	months[10] = "November";
	months[11] = "December";	
	
	$scope.currentMonthId = new Date().getMonth();
  $scope.ctrl = {
    step:1 //debug
  };

  $scope.habitsDemo = ['','',''];
	//$scope.nameDemo = 'You';


	function daysInMonth() {
	   var d = new Date();
	   return 32 - new Date(d.getFullYear(), d.getMonth(), 32).getDate();
	}

    $scope.isWeekend = function(day){
      var d = new Date();
      d.setDate(day);
      var weekday = d.getDay();
      return (weekday == 6) || (weekday == 0); 
    }
	
	var addUser = function(){
		$scope.users.push({
			name:'',
			habits:['','','','','']
		});	
	};
	
	$scope.users = [];
	if (localStorage.getItem('data')){
		var stage = JSON.parse(localStorage.getItem('data'));
		for (var i=0,ii=stage.length;i<ii;i+=1){
			if (stage[i].name && stage[i].habits[0]){
				$scope.users.push(stage[i]);
			}
		}		
	}
	
	if ($scope.users.length==0){
		addUser();
	}
	
	
	
	$scope.activeUser=0;
	
	$scope.activateUser = function(id){
		$scope.activeUser = id;
	};
	
	$scope.addUser=function(){
		if ($scope.users[$scope.activeUser].name != '' && $scope.users[$scope.activeUser].habits[0] != ''){
			addUser();
			$scope.activeUser = $scope.users.length-1;
		}
	};

	$scope.$watch('ctrl.step',function(newval,oldval){
		if (oldval) {
			$scope.save();
		}
	});
	
	$scope.save = function(){
	    //delete empty data

		
		var data = JSON.stringify($scope.users);
		localStorage.setItem('data',data);
		//remoteStorage.setItem('data', data, function(){
		//	console.log('Data saved');
		//});
	}


    $scope.daysInMonth =  new Array(daysInMonth());
        
  }
  