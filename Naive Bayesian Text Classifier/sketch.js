// Naive Bayesian Text Classifier
// Carla de Beer
// November 2016
// Inspired by Daniel Shiffman's Coding Rainbow series:
// http://shiffman.net/a2z/intro/
// NOTE: Numbers are excluded from the training set dictionary

var dictionary = {};
var docCountA = 0;
var docCountB = 0;
var resA = 0;
var resB = 0;
var newWords;
var result = [];


function loadJSON(filePath, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', filePath, true);
	xobj.onreadystatechange = function () {
		if(xobj.readyState === XMLHttpRequest.DONE) {
			if(xobj.status === 200 || xobj.status == XMLHttpRequest.UNSENT) {
				callback(xobj.responseText);
			}
		}
	};
	xobj.send(null);
}

function readTextFile(filePath, callback) {
	var xobj = new XMLHttpRequest();
	xobj.open("GET", filePath, false);
	xobj.onreadystatechange = function () {
		if(xobj.readyState === XMLHttpRequest.DONE) {
			if(xobj.status === 200 || xobj.status == XMLHttpRequest.UNSENT) {
				var headerText = xobj.responseText.slice(0, xobj.responseText.indexOf("\n"));
				callback(xobj.responseText, headerText);
			}
		}
	};
	xobj.send(null);
}

function train2() {
	loadJSON("JSON/training2.json", function(response) {
		var trainingSet = JSON.parse(response);
		resetGlobals();
		train(trainingSet);
	});
}

function train10() {
	loadJSON("JSON/training10.json", function(response) {
		var trainingSet = JSON.parse(response);
		resetGlobals();
		train(trainingSet);
	});
}

function train20() {
	loadJSON("JSON/training20.json", function(response) {
		var trainingSet = JSON.parse(response);
		resetGlobals();
		train(trainingSet);
	});
}

function train(trainingSet) {
	// Train the classifier
	for (var i = 0, l = trainingSet.length; i < l; ++i) {
		readTextFile("textFiles/" + trainingSet[i].path, function(response) {
			var object = {
				text: response,
				category: trainingSet[i].category
			};
			countWords(object);
		});
	}

	calculateProbabilities();
}

function resetGlobals() {
	dictionary = {};
	docCountA = 0;
	docCountB = 0;
	result = [];
}

function chooseText(id) {
	var filePath;
	resA = 0;
	resB = 0;
	newWords = "";

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

	readTextFile(filePath, function(response, header) {
		var unknown = response;
		if (unknown !== "") {
			calculateResult(unknown);
			renderOutputFiles(filePath, header);
		} else {
			renderError();
		}
	});
}

function calculateWithText() {
	resA = 0;
	resB = 0;
	newWords = "";

	var unknown = document.getElementById("textArea").value;
	if (unknown !== "") {
		calculateResult(unknown);
		renderOutputText();
	} else {
		renderError();
	}
}

function calculateResult(unknown) {
	newWords = unknown.split(/[\W+\d+]/);
	newWords = newWords.filter(Boolean);
	convertToLowerCase(newWords);
	combineProbablities();
}

function countWords(object) {
	var tokens = object.text.split(/[\W+\d+]/);
	tokens = tokens.filter(Boolean);

	// Count total number of words per document category
	if (object.category === "A") {
		docCountA += tokens.length;
	} else if (object.category === "B") {
		docCountB += tokens.length;
	}

	// Count number of occurrences per document
	for (var i = 0, l = tokens.length; i < l; ++i) {
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
		} else {
			if (object.category === "A") {
				dictionary[token].countA++;
			} else if (object.category === "B") {
				dictionary[token].countB++;
			}
		}
	}
}

function calculateProbabilities() {
	for (var key in dictionary) {
		if (dictionary.hasOwnProperty(key)) {
			var object = {};
			var word = dictionary[key];

			var freqA = word.countA / docCountA;
			var freqB = word.countB / docCountB;

			// Probability via Bayes rule
			object.word = key;
			object.probA = freqA / (freqA + freqB);
			object.probB = 1 - object.probA;

			result.push(object);
		}
	}
}

function combineProbablities() {
	// Combined probabilities
	// http://www.paulgraham.com/naivebayes.html
	var productA = 1.0;
	var productB = 1.0;

	// Multiply probabilities together
	if (newWords.length === 1) {
		for (var j = 0, m = result.length; j < m; ++j) {
			if (result[j].word === newWords[0]) {
				if (result[j].probA === 1 && result[j].probB === 0) {
					productA = 1.0;
					productB = 0.0;
				} else if (result[j].probB === 1 && result[j].probA === 0) {
					productA = 0.0;
					productB = 1.0;
				} else {
					if (result[j].probA > 0) {
						productA *= result[j].probA;
					}
					if (result[j].probB > 0) {
						productB *= result[j].probB;
					}
				}
			}
		}
	} else if (newWords.length > 1) {
		for (var i = 0, l = newWords.length; i < l; ++i) {
			var newWord = newWords[i];
			for (var j = 0, m = result.length; j < m; ++j) {
				if (result[j].word === newWord) {
					if (result[j].probA > 0) {
						productA *= result[j].probA;
					}
					if (result[j].probB > 0) {
						productB *= result[j].probB;
					}
				}
			}
		}
	}

	// Apply formula
	resA = productA / (productA + productB);
	resB = productB / (productB + productA);
}

function renderOutputFiles(filePath, headerText) {
	var container = document.getElementById("innerContainer");
	var newParagraph = document.createElement("p");
	newParagraph.id = "dynamicParagraph";

	if (Object.keys(dictionary).length === 0) {
		newParagraph.textContent = "You need to train the classifier before classification";
	} else {
		var business = "BUSINESS";
		var sport = "SPORT";
		if (resA > resB) {
			newParagraph.innerHTML = filePath.substring(filePath.length - 8, filePath.length) + ". '" +
				headerText + "' | " + "Classification Result: " + business.bold();
			newParagraph.classList.add("paraPinkText");
		} else if (resA < resB) {
			newParagraph.innerHTML = filePath.substring(filePath.length - 8, filePath.length) + ". '" +
				headerText + "' | " + "Classification Result: " + sport.bold();
			newParagraph.classList.add("paraGreenText");
		} else if (resA === resB) {
			newParagraph.innerHTML = "RESULT: There is an equal probability of the Input Text being of either category";
			newParagraph.classList.add("paraPinkText");
		}
	}

	newParagraph.classList.add("result");
	container.appendChild(newParagraph);
}

function renderOutputText() {
	var container = document.getElementById("innerContainer");
	var newParagraph = document.createElement("p");
	newParagraph.id = "dynamicParagraph";

	if (Object.keys(dictionary).length === 0) {
		newParagraph.textContent = "You need to train the classifier before classification";
	} else {
		var business = "BUSINESS";
		var sport = "SPORT";
		if (resA > resB) {
			newParagraph.innerHTML = "Input text classification result: " + business.bold();
			newParagraph.classList.add("paraPinkText");
		} else if (resA < resB) {
			newParagraph.innerHTML = "Input text classification result: " + sport.bold();
			newParagraph.classList.add("paraGreenText");
		} else if (resA === resB) {
			newParagraph.innerHTML = "RESULT: There is an equal probability of the input text being of either category";
		}
	}

	newParagraph.classList.add("result");
	container.appendChild(newParagraph);
}

function renderError() {
	var container = document.getElementById("innerContainer");
	var newParagraph = document.createElement("p");
	newParagraph.id = "dynamicParagraph";
	if (Object.keys(dictionary).length === 0) {
		newParagraph.innerHTML = "You need to train the classifier before classification";
	} else {
		newParagraph.innerHTML = "Input text is empty";
	}
	newParagraph.classList.add("result");
	container.appendChild(newParagraph);
}

function convertToLowerCase(array) {
	for(var i = 0; i < array.length; ++i) {
		array[i] = array[i].toLowerCase();
	}
}

function clearDiv() {
	document.getElementById("innerContainer").innerHTML = "";
	document.getElementById("textArea").value = "";
}