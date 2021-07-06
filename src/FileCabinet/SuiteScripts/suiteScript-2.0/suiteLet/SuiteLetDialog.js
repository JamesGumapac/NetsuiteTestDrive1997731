define(['N/ui/dialog'],

function(dialog) {
   function moodRing() {
	var btn1 = {
			label: 'happy',
			value: 'Well, Happy for you!'
	}
	var btn2 = {
			label: 'Sad ',
			value: 'Not good to hear that !'
	}
	var btn3 = {
			label: 'Excite',
			value: 'about what?!'
	}
	
	var option = {
			title: 'SS2 dialog Demo',
			message: 'How are you feeling today?',
			buttons: [btn1,btn2,btn3]
	}
	function success(result) {
		dialog.alert({
			title: 'Current Modd',
			message: result
		})
		.then(function(result){
			console.log('SUCCESS')
		})
//			.catch(function(reason){
//			console.log('FAIL');
//		})
	}
	function failure() {
		console.log('Dialog fail because it ')
	}
	dialog.create(option).then(success)
}
    return {
        moodRing: moodRing
    };
    
});
