deleteWorkout = function(workoutNameAndDate){
    var workoutToDelete = workoutNameAndDate.split(" - ");

    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i) != null) {
            var workout = localStorage.getItem(i).split("_");
            if (workout[0] == workoutToDelete[0] && workout[1] == workoutToDelete[1]) {
                 localStorage.removeItem(i);
            };
        }
    }

    window.location.href = "index.html";
}

loadLocalStorage = function () {
    var isItEmpty = true;
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i) != null) {
            isItEmpty = false;
            break;
        }
    }
    if (isItEmpty) {
        var empty = document.createElement('div');
        empty.innerHTML = '<h4>Your workout diary is empty.</h4>';
        workoutslist.appendChild(empty);
    };

    var workoutdiarylist = document.getElementById('workoutdiarylist');

    // This for the separation
    var workoutNameArray = [];
    var workoutDateArray = [];
    var workoutExerciseArray = [];
    var workoutSeriesArray = [];
    var workoutRepsArray = [];
    var workoutWeightArray = [];

    var alreadyPrinted = [];

    // Collecting the same workout exercises under one workout
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i) != null) {
            var workout = localStorage.getItem(i).split("_");

            workoutNameArray.push(workout[0] + " - " + workout[1]);
            workoutDateArray.push(workout[1]);
            workoutExerciseArray.push(workout[2]);
            workoutSeriesArray.push(workout[3]);
            workoutRepsArray.push(workout[4]);
            workoutWeightArray.push(workout[5]);
        }
    }

    // Printig the DOM elements
    var alreadyPrintedBool = false;
    for (var i = 0; i < workoutNameArray.length; i++) {
        
        for (var j = 0; j < alreadyPrinted.length; j++) {
            if (alreadyPrinted[j] == workoutNameArray[i]) {
                alreadyPrintedBool = true;
                break;
            }
        }        

        if (!alreadyPrintedBool) {
            var workoutName = workoutNameArray[i];
            var workoutExercises = "";

            for (var k = 0; k < workoutNameArray.length; k++) {
                if(workoutName == workoutNameArray[k]) {
                    var tempString = workoutExerciseArray[k] + " <b>" + workoutSeriesArray[k] + "x" + workoutRepsArray[k] + "</b> with <b>" + workoutWeightArray[k] + "kg</b><br>";
                    workoutExercises += "<div style='text-align:left;'>" + tempString + "</div>";
                }
            }

            var workout = document.createElement('div');
            workout.innerHTML = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default"><div class="panel-heading" role="tab" id="heading' + "workout_" + i +'"><h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' + "workout_" + i +'" aria-expanded="false" aria-controls="collapse' + "workout_" + i +'"><b>'+workoutName+'</b></a></h4></div><div id="collapse' + "workout_" + i +'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + "workout_" + i +'"><div id="exerciseList" class="panel-body">' + workoutExercises + '<br><a href="javascript: deleteWorkout(&#34;'+ workoutName +'&#34;);" style="color: red; text-decoration:none;">Delete workout <span class="glyphicon glyphicon-trash"></span></a></div></div></div></div>';
            workoutslist.appendChild(workout);
        }

        alreadyPrinted.push(workoutNameArray[i]);
        alreadyPrintedBool = false;
    }

};