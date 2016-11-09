// Naive Bayesian Text Classifier
// Carla de Beer
// November 2016
// Inspired by Daniel Shiffman's Coding Rainbow series:
// http://shiffman.net/a2z/intro/

// Built with P5.js

var dictionary = {};
var tokenCountA = 0;
var tokenCountB = 0;
var docCountA = 0;
var docCountB = 0;
var probA = 0;
var probB = 0;
var resA = 0;
var resB = 0;

var inputList = [
	{
		path: "CategoryA/rainbows.txt",
		category: "A"

	}, {
		path: "CategoryB/unicorns.txt",
		category: "B"
	}
];

var unknown = readTextFile("textFiles/CategoryX/horses.txt");

function setup() {

  	noCanvas();

	for (var i = 0, l = inputList.length; i < l; ++i) {

		var text = readTextFile("textFiles/" + inputList[i].path);

		var object = {
			text: text,
			category: inputList[i].category
		};

		train(object);

	}

	var words = unknown.split(/\W+/);
	combineProbablities(words);

	var container = document.getElementById("container");
	var newParagraph = document.createElement('p');

	if (resA > resB) {
		newParagraph.textContent = "RESULT: There is a " + (resA * 100).toFixed(4) + "% probability of the Input Text being of Category A";
	} else if (resA < resB) {
		newParagraph.textContent = "RESULT: There is a " + (resB * 100).toFixed(4) + "% probability of the Input Text being of Category B";
	} else if (resA === resB) {
		newParagraph.textContent = "RESULT: There is an equal probability of the Input Text being of either category";
	}


	newParagraph.classList.add("result");
	container.appendChild(newParagraph);

}

function readTextFile(file) {
	var allText = {};
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === XMLHttpRequest.DONE) {
			if(rawFile.status === 200 || rawFile.status == XMLHttpRequest.UNSENT) {
				allText = rawFile.responseText;
			}
		}
	};

	rawFile.send(null);
	return allText;
}

function train(object) {

	var tokens = object.text.split(/\W+/);

	// Count total number of document size
	if (object.category === "A") {
		docCountA += tokens.length;
	} else if (object.category === "B") {
		docCountB += tokens.length;
	}

	// Count number of occurrences per document
	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i].toLowerCase();
		if (dictionary[token] === undefined) {
			dictionary[token] = {};
			dictionary[token].countA = 0;
			dictionary[token].countB = 0;
			dictionary[token].word = token;
		} else {
			if (object.category === 'A') {
				this.dictionary[token].countA++;
				this.tokenCountA++;
			} else if (object.category === 'B') {
				this.dictionary[token].countB++;
				this.tokenCountB++;
			}
		}
	}

	calculateProbabilities(tokens);
}

function calculateProbabilities(keys) {

	// Ok, assuming we have an array of keys
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i].toLowerCase();
		var word = dictionary[key];

		// Average frequency per document
		// (this assumes we've counted total documents)
		word.freqA = word.countA / docCountA;
		word.freqB = word.countB / docCountB;

		if (isNaN( word.freqA )) {
			word.freqA = 0;
		} else if (isNaN( word.freqB )) {
			word.freqB = 0;
		}

		// Probability via Bayes rule
		word.probA = word.freqA / (word.freqA + word.freqB);
		word.probB = 1 - word.probA;

		// Copy results over to global variables
		if (i = keys.length - 1) {
			probA = word.probA;
			probB = word.probB;
		}
	}
}

function combineProbablities(words) {

	// Combined probabilities
	// http://www.paulgraham.com/naivebayes.html
	var productA = 1;
	var productB = 1;

	// Multiply probabilities together
	for (var i = 0; i < words.length; i++) {
		productA *= probA;
		productB *= probB;
	}
	// Apply formula
	resA = productA / (productA + productB);
	resB = productB / (productB + productA);

}

