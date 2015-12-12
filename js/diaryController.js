loadDiary = function () {
	// read the JSON file
	$.getJSON('data/exercises.json', { get_param: 'value' }, function(data) {
		var exerciselist = document.getElementById('exerciselist');

		// Get the main body parts
		for (var mainBodyPart in data) {
			// superLongString: contains the checklist elements -> the exercises for the specified body parts
			var superLongString = "";
			for (var i = 0; i < data[mainBodyPart].length; i++) {							  
			    superLongString += "<div class='checkbox' style='text-align:left;'><label><input type='checkbox' id='"+data[mainBodyPart][i].capitalize()+"' name='"+data[mainBodyPart][i].capitalize()+"' value='"+data[mainBodyPart][i].capitalize()+"'>"+data[mainBodyPart][i].capitalize()+"</label></div>";
			}

			var exercise = document.createElement('div');
			exercise.innerHTML = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default"><div class="panel-heading" role="tab" id="heading'+mainBodyPart+'"><h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+mainBodyPart+'" aria-expanded="false" aria-controls="collapse'+mainBodyPart+'">'+mainBodyPart+'</a></h4></div><div id="collapse'+mainBodyPart+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+mainBodyPart+'"><div id="exerciseList" class="panel-body">'+superLongString+'</div></div></div></div>';
			exerciselist.appendChild(exercise);
		}
	});
}

String.prototype.capitalize = function(){
    var saa = this.toLowerCase();
    var sb = saa.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    return sb;
};

var exercisesArray = [];
var workoutName = "";
var workoutDate = "";
getInputValues = function(){
	var counter = 0; // counter for checked checkboxes
	//var exercisesArray = []; // array for storing exercises that checked
	var input_obj = document.getElementsByTagName('input'); // get a collection of objects with the specified 'input' TAGNAME

	/*var */workoutName = document.getElementById('workout-name').value; // get the workout name
	/*var */workoutDate = document.getElementById('datepicker').value; // get the workout date

    for (var i = 0; i < input_obj.length; i++) {
        if (input_obj[i].type === 'checkbox' && input_obj[i].checked === true) {
            counter++;
            exercisesArray.push(input_obj[i].value);
        }
    }

    if (workoutName.length != 0) {
    	if (workoutDate.length != 0) {
    		if (counter != 0) {
    			document.getElementById('workoutselector').style.display = 'none';
    			document.getElementById('workoutsaver').style.display = 'initial';

    			document.getElementById('exerciselist').style.display = 'none';
    			document.getElementById('workout-name-div').style.display = 'none';
    			document.getElementById('workout-date-div').style.display = 'none';
    			document.getElementById('edit').style.display = 'none';
    			document.getElementById('save').style.display = 'initial';

    			document.getElementById('add-new-workout').style.display = 'none';
    			document.getElementById('your-workout-name').style.display = 'initial';
    			document.getElementById('your-workout-name').innerHTML = workoutName;

    			document.getElementById('your-workout-date').style.display = 'initial';
    			document.getElementById('your-workout-date').innerHTML = workoutDate;
    			

				document.getElementById('editexerciselist').style.display = 'initial';
    			
    			editSelectedExercises(exercisesArray);
    		}
    		else alert('Please select least one exercise!');
    	}
    	else alert('Please select the workout date!');
	}
	else alert('Please fill out the workout name!');
};

editSelectedExercises = function(exercisesArray){
	for (var i = 0; i < exercisesArray.length; i++) {
		var inputSeries = '<div class="input-group input-group-sm"><span class="input-group-addon">Number of series</span><input type="text" onkeypress="return validateQty(event);" class="form-control" id="series'+i+'" aria-describedby="sizing-addon3" type="number"></div>';
		var inputReps = '<div class="input-group input-group-sm"><span class="input-group-addon">Number of reps</span><input type="text" onkeypress="return validateQty(event);" class="form-control" id="reps'+i+'" aria-describedby="sizing-addon3" type="number"></div>';
		var inputWeight = '<div class="input-group input-group-sm"><span class="input-group-addon">Weight (kg)</span><input type="text" onkeypress="return validateQty(event);" class="form-control" id="weight'+i+'" aria-describedby="sizing-addon3" type="number"></div>';

		var exercise = document.createElement('div');
		exercise.innerHTML = '<div class="panel panel-default"><div class="panel-heading">' + exercisesArray[i] + '</div><div class="panel-body">' + inputSeries + inputReps + inputWeight + '</div></div>';
		editexerciselist.appendChild(exercise);
	};
};

saveWorkout = function(){
	var input_obj = document.getElementsByTagName('input'); // get a collection of objects with the specified 'input' TAGNAME

	var seriesArray = [];
	var repsArray = [];
	var weightArray = [];

	var seriesString = "";
    var repsString = "";
    var weightString = "";

    var seriesCounter = 0;
    var repsCounter = 0;
    var weightCounter = 0;
    for (var i = 0; i < input_obj.length; i++) {

    	seriesString = 'series' + seriesCounter;
    	repsString = 'reps' + repsCounter;
    	weightString = 'weight' + weightCounter;

    	if(input_obj[i].id == seriesString){
    		seriesArray.push(input_obj[i].value);
    		seriesCounter++;
    	}
    	if(input_obj[i].id == repsString){
    		repsArray.push(input_obj[i].value);
    		repsCounter++;
    	}
    	if(input_obj[i].id == weightString){
    		weightArray.push(input_obj[i].value);
    		weightCounter++;
    	}
    }

    // Creating an array of strings, example: "Test_12/06/2015_Dumbbell Shrug_3_10_10"
    var localStorageLength = localStorage.length;
    for (var i = 0; i < exercisesArray.length; i++) {
    	// Create string
    	var string = workoutName+"_"+workoutDate+"_"+exercisesArray[i]+"_"+seriesArray[i]+"_"+repsArray[i]+"_"+weightArray[i];
    	// Add into local storage
    	localStorage.setItem(localStorageLength + i, string);
    };

    window.location.href = "workouts.html";
};