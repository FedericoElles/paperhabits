angular.module('PaperHabits', ['pascalprecht.translate'])
    .config(['$translateProvider', function($translateProvider) {
      $translateProvider.translations('en', {
        H1: 'An offline habit tracking sheet to be pinned on your fridge.',
        BUTTON_CREATE: 'Create your own',
        TEXT_YOUR_NAME : 'You',
        TEXT_SAMPLE_0: '5 min exercise',
        TEXT_SAMPLE_1: 'Learn chinese',
        TEXT_SAMPLE_2: 'No alcohol',
        MONTH_0: 'January',
        MONTH_1: 'February',
        MONTH_2: 'March',
        MONTH_3: 'April',
        MONTH_4: 'May',
        MONTH_5: 'June',
        MONTH_6: 'July',
        MONTH_7: 'August',
        MONTH_8: 'September',
        MONTH_9: 'October',
        MONTH_10: 'November',
        MONTH_11: 'December',        
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_DE: 'german'
      })
      .translations('de', {
        H1: 'Arbeite an Deinen positiven Gewohnheiten. Offline. Mit Deinem Kühlschrank',
        BUTTON_CREATE: 'Erstelle Deine Tabelle',
        TEXT_YOUR_NAME : 'Du',
        TEXT_SAMPLE_0: '5 Minuten Training',
        TEXT_SAMPLE_1: 'Lerne Spanisch',
        TEXT_SAMPLE_2: 'Kein Alkohol',
        MONTH_0: 'Januar',
        MONTH_1: 'Februar',
        MONTH_2: 'März',
        MONTH_3: 'April',
        MONTH_4: 'Mai',
        MONTH_5: 'Juni',
        MONTH_6: 'Juli',
        MONTH_7: 'August',
        MONTH_8: 'September',
        MONTH_9: 'Oktober',
        MONTH_10: 'November',
        MONTH_11: 'Dezember',           
        BUTTON_LANG_EN: 'englisch',
        BUTTON_LANG_DE: 'deutsch'
      })
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en_US': 'en',
        'en_UK': 'en',
        'de_DE': 'de',
        'de_CH': 'de'
      })
      .determinePreferredLanguage();

    }])
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

    $scope.placeholders = [
      'A first habit...',
      'It takes two to tango...',
      'Third habit...',
      'Oh, getting overconfident...',
      'This must be the last one!'
    ];
    $scope.habitsDemo = ['5 min exercise','Learn chinese','No alcohol','',''];
	$scope.nameDemo = 'You';


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
  