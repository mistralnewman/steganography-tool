//let patternElem = document.getElementById("pattern");
let plaintextInput = document.getElementById("plaintext-input");
let patternOutput = document.getElementById("pattern-output");
let ciphertextInput = document.getElementById("ciphertext-input");
let wordOutput = document.getElementById("word-output");
let statusOutput = document.getElementById("status-output");

let statuses = {
	0: { message: "Success!", color: "#d2ffbc" },
	1: { message: "So far so good!", color: "#fffba2" },
	2: { message: "No matching words found!", color: "#ffc08b" },
	3: { message: "Your input does not match!", color: "#ffaeae" }
}

function updateAllOutput()
{
	// display binary pattern
	let patt = messageToPattern(plaintextInput.value);
	patternOutput.value = patt;
	
	// get the suggestions & status message
	let suggestions = getSuggestions(ciphertextInput.value, patt, trieCorpus);
	//update status message & color
	let statusMessage = suggestions[0];
	statusOutput.innerHTML = "<strong>Status:</strong> "+statuses[statusMessage].message;
	statusOutput.style.backgroundColor = statuses[statusMessage].color;
	//update suggested words
	let wordOutputArray = suggestions[1]
	console.log(wordOutputArray);
	let tableWidth = 6;
	let tableHeight = 6;
	wordOutput.innerHTML = "";
	for(let i = 0; i < tableHeight; i++)
	{
		let currRow = wordOutput.insertRow(i);
		for(let j = 0; j < tableWidth; j++)
		{
			let currCell = currRow.insertCell(j);
			let currData = wordOutputArray[(tableWidth*i)+j];
			currCell.innerHTML = typeof currData !=  "undefined" ? currData : "";
		}
	}
}
updateAllOutput();