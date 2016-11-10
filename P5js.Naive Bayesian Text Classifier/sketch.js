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
var resA = 0.0;
var resB = 0.0;
var newWords;
var result = [];

var filePath;

var inputList = [
	{
		path: "CategoryA/rainbows.txt",
		category: "A"

	}, {
		path: "CategoryB/unicorns.txt",
		category: "B"
	}
];


function setup() {
  	noCanvas();
}

function chooseText(id) {

	if (id === "choose1") {
		filePath = "textFiles/CategoryX/horses.txt";
	} else if (id === "choose2") {
		filePath = "textFiles/CategoryX/colours.txt";
	}

	var unknown = readTextFile(filePath);

	newWords = unknown.split(/\W+/);

	for (var i = 0, l = inputList.length; i < l; ++i) {

		var text = readTextFile("textFiles/" + inputList[i].path);
		var object = {
			text: text,
			category: inputList[i].category
		};

		countWords(object);
	}

	calculateProbabilities();

	combineProbablities();

	var container = document.getElementById("container");
	var dynamicParagraph = document.getElementById("dynamicParagraph");

	if (dynamicParagraph) {
		dynamicParagraph.parentNode.removeChild(dynamicParagraph);
	}

	var newParagraph = document.createElement("p");
	newParagraph.id = "dynamicParagraph";

	if (resA > resB) {
		newParagraph.textContent = "RESULT: The Input Text belongs to CATEGORY A: RAINBOWS";
		//"RESULT: There is a " + (resA * 100).toFixed(4) + "% probability of the Input Text being of Category A";
	} else if (resA < resB) {
		newParagraph.textContent = "RESULT: The Input Text belongs to CATEGORY B: UNICORNS";
		//"RESULT: There is a " + (resB * 100).toFixed(4) + "% probability of the Input Text being of Category A";
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

function countWords(object) {

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
			if (object.category === "A") {
				dictionary[token].countA = 1;
				dictionary[token].countB = 0;
			} else if (object.category === "B") {
				dictionary[token].countA = 0;
				dictionary[token].countB = 1;
			}
			dictionary[token].word = token;
		} else {
			if (object.category === "A") {
				dictionary[token].countA++;
				tokenCountA++;
			} else if (object.category === "B") {
				dictionary[token].countB++;
				tokenCountB++;
			}
		}
	}
}

function calculateProbabilities() {
	for (var key in dictionary) {
		if (dictionary.hasOwnProperty(key)) {

			var object = {};

			var word = dictionary[key];

			result.word = word.word;
			var freqA = word.countA / docCountA;
			var freqB = word.countB / docCountB;

			// Probability via Bayes rule
			object.word = word.word;
			object.probA = freqA / (freqA + freqB);
			object.probB = 1 - object.probA;

			result.push(object);
		}
	}
}

function combineProbablities() {

	// Combined probabilities
	// http://www.paulgraham.com/naivebayes.html
	var productA = 1;
	var productB = 1;

	// Multiply probabilities together
	for (var i = 0; i < newWords.length; i++) {
		var newWord = newWords[i];
		for (var j = 0; j < result.length; ++j) {
			if (result[j].word === newWord) {
				//if (result[j].probA !== 0) {
					productA *= result[j].probA;
				//} if (result[j].probB !== 0) {
					productB *= result[j].probB;
				//}
			}
		}
	}

	// Apply formula
	resA = productA / (productA + productB);
	resB = productB / (productB + productA);

}

