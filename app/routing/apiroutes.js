// require path so we can parse directory structures
var path = require('path');

// pull in friends variable data file
var friends = require('../data/friends.js');

module.exports = function(app) {

	// if user goes to /api/friends, send variable data as json
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	// handle post request from survey form
	app.post("/api/friends", function(req, res) {
		
		// set up array hoding user's answers
		var surveyResults = req.body.scores;
		// convert values in surveyResults to integers
		for (var i=0; i<surveyResults.length; i++) {
			surveyResults[i] = parseInt(surveyResults[i]);
		}

		// bestDifference variable will holds value
		// difference between image in friends array
		// and user selections, and bestMatch will hold
		// position in array of  best match
		var bestDifference = 999999; // start with high dummy value
		var bestMatch = 0; // assume first pet is best match, adjust later

		// cycle through friends array, hit every pet stored
		for (i=0; i < friends.length; i++) {

			// define temp value that calculates difference between user selection and
			// current i-th animal friend being compared against, use
			// difference function to calculate difference
			var tempDifference = difference(surveyResults, friends[i].scores);

			// console log difference between user choices and image being compared
			console.log("difference between", surveyResults, "and", friends[i].name, friends[i].scores, "=", tempDifference);

			// if comparison shows that current animal has lower difference (hence is
			// a better match), update value of best difference to be current
			// comparison's difference, and update best match to current i-th position which
			// represents image being compared. After loop finishes, bestMatch reflects
			//true final best match
			if (tempDifference < bestDifference) {
				bestDifference = tempDifference;
				bestMatch = i;
			}
		}

		// function to calculate difference between two arrays
		//cycles through values of each array and subtracts them
		// from values of other aray, applies absolute
		// value function, returns total tally reflecting
		//deviation between the two arrays.
		function difference(array1, array2) {

			// differenceAmount holds the tally of difference between array values
			var differenceAmount=0;
			
			for (var i=0; i<array1.length; i++) {
				differenceAmount += Math.abs(array1[i] - array2[i]);
			}
			
			// return difference between the two arrays reflecting deviation
			return differenceAmount;
		}

		// send bestMatch back to html page in response to post
		res.send(friends[bestMatch]);
	});
};