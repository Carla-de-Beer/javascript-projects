// Naive Bayesian Text Classifier
// Carla de Beer
// November 2016
// Inspired by Daniel Shiffman's Coding Rainbow series:
// http://shiffman.net/a2z/intro/

var dictionary = {};
var tokenCountA = 0;
var tokenCountB = 0;
var docCountA = 0;
var docCountB = 0;
var resA = 0;
var resB = 0;
var newWords;
var result = [];
var headerText;

function train2() {

	resetGlobals();

	var trainingSet = [
		{
			path: "Business/B-02.txt",
			category: "A"
		}, {
			path: "Sport/S-02.txt",
			category: "B"
		}
	];

	// Train the classifier
	for (var i = 0, l = trainingSet.length; i < l; ++i) {
		var text = readTextFile("textFiles/" + trainingSet[i].path);
		var object = {
			text: text,
			category: trainingSet[i].category
		};

		countWords(object);
	}

	calculateProbabilities();
}

function train10() {

	resetGlobals();

	var trainingSet = [
		{
			path: "Business/B-02.txt",
			category: "A"
		}, {
			path: "Business/B-03.txt",
			category: "A"
		}, {
			path: "Business/B-05.txt",
			category: "A"
		}, {
			path: "Business/B-07.txt",
			category: "A"
		}, {
			path: "Business/B-09.txt",
			category: "A"
		}, {
			path: "Sport/S-02.txt",
			category: "B"
		}, {
			path: "Sport/S-03.txt",
			category: "B"
		}, {
			path: "Sport/S-05.txt",
			category: "B"
		}, {
			path: "Sport/S-07.txt",
			category: "B"
		}, {
			path: "Sport/S-09.txt",
			category: "B"
		}
	];

	// Train the classifier
	for (var i = 0, l = trainingSet.length; i < l; ++i) {
		var text = readTextFile("textFiles/" + trainingSet[i].path);
		var object = {
			text: text,
			category: trainingSet[i].category
		};

		countWords(object);
	}

	calculateProbabilities();
}

function resetGlobals() {
	dictionary = {};
	tokenCountA = 0;
	tokenCountB = 0;
	docCountA = 0;
	docCountB = 0;
	result = [];
}

function chooseText(id) {

	var filePath;
	resA = 0;
	resB = 0;

	if (id === "choose1") {
		filePath = "textFiles/CategoryX/X-01.txt";
	} else if (id === "choose2") {
		filePath = "textFiles/CategoryX/X-02.txt";
	}  else if (id === "choose3") {
		filePath = "textFiles/CategoryX/X-03.txt";
	}  else if (id === "choose4") {
		filePath = "textFiles/CategoryX/X-04.txt";
	}  else if (id === "choose5") {
		filePath = "textFiles/CategoryX/X-05.txt";
	}  else if (id === "choose6") {
		filePath = "textFiles/CategoryX/X-06.txt";
	}  else if (id === "choose7") {
		filePath = "textFiles/CategoryX/X-07.txt";
	}  else if (id === "choose8") {
		filePath = "textFiles/CategoryX/X-08.txt";
	}  else if (id === "choose9") {
		filePath = "textFiles/CategoryX/X-09.txt";
	}  else if (id === "choose10") {
		filePath = "textFiles/CategoryX/X-10.txt";
	}

	doStuff(filePath, readFirstLine);
}

function doStuff(filePath, callback) {

	if (typeof callback === "function") {
		callback(filePath);
	}

	setTimeout(function() {
		var unknown = readTextFile(filePath);
		newWords = unknown.split(/\W+/);

		combineProbablities();
		renderOutput(filePath);
	}, 5);

}

function readFirstLine(filePath) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", filePath, true);
	rawFile.send();

	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === XMLHttpRequest.DONE) {
			if(rawFile.status === 200 || rawFile.status == XMLHttpRequest.UNSENT) {
				headerText = rawFile.responseText.slice(0, rawFile.responseText.indexOf("\n"));
			}
		}
	};
}

function readTextFile(filePath) {
	var allText = {};
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", filePath, false);
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
	for (var i = 0, l = tokens.length; i < l; i++) {
		var token = tokens[i].toLowerCase();
		if (dictionary[token] === undefined) {
			dictionary[token] = {};
			if (object.category === "A") {
				dictionary[token].countA = 1;
				dictionary[token].countB = 0;
			} else if (object.category === "B") {
				dictionary[token].countA = 1;
				dictionary[token].countB = 0;
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
	for (var i = 0, l = newWords.length; i < l; i++) {
		var newWord = newWords[i];
		for (var j = 0, m = result.length; j < m; ++j) {
			if (result[j].word === newWord) {

				if (result[j].probA !== 0) {
					productA *= result[j].probA;
				}

				if (result[j].probB !== 0) {
					productB *= result[j].probB;
				}
			}
		}
	}

	// Apply formula
	resA = productA / (productA + productB);
	resB = productB / (productB + productA);
}

function renderOutput(filePath) {
	var container = document.getElementById("innerContainer");
	var newParagraph = document.createElement("p");
	newParagraph.id = "dynamicParagraph";

	if (Object.keys(dictionary).length === 0) {
		newParagraph.textContent = "You need to train the classifier before classification";
	} else {
		if (resA > resB) {
			newParagraph.textContent = filePath.substring(filePath.length - 8, filePath.length) + ". '" + headerText + "': " + "Classification Result: BUSINESS";
		} else if (resA < resB) {
			newParagraph.textContent = filePath.substring(filePath.length - 8, filePath.length) + ". '" + headerText + "': " + "Classification Result: SPORT";
		} else if (resA === resB) {
			newParagraph.textContent = "RESULT: There is an equal probability of the Input Text being of either category";
		}
	}

	newParagraph.classList.add("result");
	container.appendChild(newParagraph);
}

function clearDiv() {
	document.getElementById("innerContainer").innerHTML = "";
}