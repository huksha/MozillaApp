loadLocalStorage = function () {
    
    // ******************************* FOR TESTING ONLY ********************************
    // Clean localStorage <- only for testing (not for demo)
    // clearLocalStorage();

    // Load demo data <- first clear the localStorage then loads the demo data
    // Run this, if you want to load a demo progress
    // loadDemoData();
    // ******************************* FOR TESTING ONLY ******************************** 

    var workoutdiarylist = document.getElementById('workoutdiarylist');

    var isItEmpty = true;
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i) != null) {
            isItEmpty = false;
            break;
        }
    }
    if (isItEmpty) {
        var empty = document.createElement('div');
        empty.innerHTML = "<h4>Let's make a workout first!</h4>";
        workoutdiarylist.appendChild(empty);
    };

    // Get the oldest and the latest stat for an exercise
    var exercisesForStats = new Array();
    for (var i = 0; i < localStorage.length; i++) {
        // Cut string in pieces
        // workout[0] = "Teszt", workout[1] = "12/01/2015", workout[2] = "Lying Face Up Plate Neck Resistance", workout[3] = "4", workout[4] = "12", workout[5] = "30"
        if (localStorage.getItem(i) != null) {
            var workout = localStorage.getItem(i).split("_");

            // Counting stats
            var latestExercise = workout[2] + "_latest";
            if (exercisesForStats[workout[2]] == null) {
                exercisesForStats[workout[2]] = parseInt(workout[3]) * parseInt(workout[4]) * parseInt(workout[5]);
            }
            else {            
                exercisesForStats[latestExercise] = parseInt(workout[3]) * parseInt(workout[4]) * parseInt(workout[5]);
            }

            // Wrinting stats into the array
            if (exercisesForStats[latestExercise] == null) {
                exercisesForStats[workout[2] + "=stat"] = exercisesForStats[workout[2]];
            } else {
                exercisesForStats[workout[2] + "=stat"] = exercisesForStats[latestExercise] / exercisesForStats[workout[2]];
            } 
        };
    };

    // Writing out stats into labels
    for (var exercise in exercisesForStats) {
        if (exercise.indexOf('=') !== -1) { // ha van '=stat"
            // a little bug solution -> 20 means that the improvement was 20% (this is impossible)
            if (exercisesForStats[exercise] > 20) {
                exercisesForStats[exercise] = 1;
            }

            // positive
            if (exercisesForStats[exercise] > 1) {
                var num = (Math.round(exercisesForStats[exercise] * 100) / 100) - 1;
                var statPercentage = (Math.round(num * 100) / 10);
                exercise = exercise.substring(0, exercise.length - 5); // removes '=stat'
                var labelStat = document.createElement('div');
                labelStat.innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-success"><span class="badge">+' + statPercentage + '%</span>' + exercise + '</li></ul>';
                workoutdiarylist.appendChild(labelStat);
            }
            // negative
            if (exercisesForStats[exercise] < 1) {
                var num = 1 - (Math.round(exercisesForStats[exercise] * 100) / 100);
                var statPercentage = (Math.round(num * 100) / 10);
                exercise = exercise.substring(0, exercise.length - 5); // removes '=stat'
                var labelStat = document.createElement('div');
                labelStat.innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-danger"><span class="badge">-' + statPercentage + '%</span>' + exercise + '</li></ul>';
                workoutdiarylist.appendChild(labelStat);
            }
            // default
            if (exercisesForStats[exercise] == 1) {
                var statPercentage = 0;
                exercise = exercise.substring(0, exercise.length - 5); // removes '=stat'
                var labelStat = document.createElement('div');
                labelStat.innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-info"><span class="badge">' + statPercentage + '%</span>' + exercise + '</li></ul>';
                workoutdiarylist.appendChild(labelStat);
            }
        }
    };
}

clearLocalStorage = function(){
    localStorage.clear();
}

loadDemoData = function(){
    clearLocalStorage();

    localStorage.setItem(0, "Chest and shoulders_11/02/2015_Clean And Press_5_8_40");
    localStorage.setItem(1, "Chest and shoulders_11/02/2015_One-arm Side Laterals_3_14_12");
    localStorage.setItem(2, "Chest and shoulders_11/02/2015_Reverse Flyes_5_8_6");
    localStorage.setItem(3, "Chest and shoulders_11/02/2015_Barbell Incline Bench Press_5_8_50");
    localStorage.setItem(4, "Chest and shoulders_11/02/2015_Dumbbell Bench Press_5_12_20");
    localStorage.setItem(5, "Chest and shoulders_11/02/2015_Low Cable Crossover_4_16_8");
    localStorage.setItem(6, "Chest and shoulders_11/09/2015_Clean And Press_5_8_41");
    localStorage.setItem(7, "Chest and shoulders_11/09/2015_One-arm Side Laterals_3_14_12");
    localStorage.setItem(8, "Chest and shoulders_11/09/2015_Reverse Flyes_5_10_5");
    localStorage.setItem(9, "Chest and shoulders_11/09/2015_Barbell Incline Bench Press_5_8_60");
    localStorage.setItem(10, "Chest and shoulders_11/09/2015_Dumbbell Bench Press_5_12_18");
    localStorage.setItem(11, "Chest and shoulders_11/09/2015_Low Cable Crossover_4_16_9");
    localStorage.setItem(12, "Back, triceps and biceps_11/11/2015_Hammer Curls_3_12_14");
    localStorage.setItem(13, "Back, triceps and biceps_11/11/2015_Ez-bar Curl_3_14_30");
    localStorage.setItem(14, "Back, triceps and biceps_11/11/2015_Preacher Curl_3_25_10");
    localStorage.setItem(15, "Back, triceps and biceps_11/11/2015_Body-up_3_12_80");
    localStorage.setItem(16, "Back, triceps and biceps_11/11/2015_Ez-bar Skullcrusher_3_12_15");
    localStorage.setItem(17, "Back, triceps and biceps_11/11/2015_Reverse Grip Triceps Pushdown_3_20_12");
    localStorage.setItem(18, "Back, triceps and biceps_11/11/2015_Pullups_3_10_80");
    localStorage.setItem(19, "Back, triceps and biceps_11/11/2015_T-bar Row_3_14_50");
    localStorage.setItem(20, "Back, triceps and biceps_11/11/2015_Barbell Deadlift_5_10_80");
    localStorage.setItem(21, "Back, triceps and biceps_11/18/2015_Hammer Curls_3_13_14");
    localStorage.setItem(22, "Back, triceps and biceps_11/18/2015_Ez-bar Curl_3_14_32");
    localStorage.setItem(23, "Back, triceps and biceps_11/18/2015_Preacher Curl_3_25_10");
    localStorage.setItem(24, "Back, triceps and biceps_11/18/2015_Body-up_3_12_81");
    localStorage.setItem(25, "Back, triceps and biceps_11/18/2015_Ez-bar Skullcrusher_3_12_20");
    localStorage.setItem(26, "Back, triceps and biceps_11/18/2015_Reverse Grip Triceps Pushdown_3_18_12");
    localStorage.setItem(27, "Back, triceps and biceps_11/18/2015_Pullups_3_10_81");
    localStorage.setItem(28, "Back, triceps and biceps_11/18/2015_T-bar Row_3_14_50");
    localStorage.setItem(29, "Back, triceps and biceps_11/18/2015_Barbell Deadlift_5_10_85");
    localStorage.setItem(30, "Legs_11/13/2015_Barbell Squat_5_10_80");
    localStorage.setItem(31, "Legs_11/13/2015_Trap Bar Deadlift_5_10_60");
    localStorage.setItem(32, "Legs_11/13/2015_Lying Leg Curls_4_14_30");
    localStorage.setItem(33, "Legs_11/13/2015_Calf Press_6_20_20");
    localStorage.setItem(34, "Legs_11/20/2015_Barbell Squat_5_10_82");
    localStorage.setItem(35, "Legs_11/20/2015_Trap Bar Deadlift_5_10_55");
    localStorage.setItem(36, "Legs_11/20/2015_Lying Leg Curls_4_14_35");
    localStorage.setItem(37, "Legs_11/20/2015_Calf Press_6_22_20");
    localStorage.setItem(38, "Legs_11/23/2015_Calf Press_6_22_22");
}