//get the things I need to look at or change
let plaintextInput = document.getElementById("plaintext-input");
let patternOutput = document.getElementById("pattern-output");
let ciphertextInput = document.getElementById("ciphertext-input");
let wordOutput = document.getElementById("word-output");
let statusOutput = document.getElementById("status-output");
let modeInput = document.getElementById("mode-input");
let clearButton = document.getElementById("clear-button");

let statuses = {
	0: { message: "Success!", color: "#d2ffbc" },
	1: { message: "So far so good!", color: "#fffba2" },
	2: { message: "No matching words found!", color: "#ffc08b" },
	3: { message: "Your input does not match!", color: "#ffaeae" }
}

let sortFunctions = {
	0: a => a.sort(),//(x, y) => x.toLowerCase().localeCompare(y.toLowerCase)), // don't use this it's bad
	1: a => a.sort((x, y) => (y.length - x.length)),
	2: a => a.sort((x, y) => (x.length - y.length)),
}

function updateAllOutput()
{
	// display binary pattern
	let patt = messageToPattern(plaintextInput.value);
	patternOutput.innerText = patt;
	
	// get the suggestions & status message
	let suggestions = getSuggestions(ciphertextInput.innerText.replace("\n", ""), patt, trieCorpus);
	//update status message & color
	let statusMessage = suggestions[0];
	statusOutput.innerHTML = "<strong>Status:</strong> "+statuses[statusMessage].message;
	statusOutput.style.backgroundColor = statuses[statusMessage].color;
	//update suggested words (sorted by sort mode)
	let sortMode = +modeInput.value;
	let wordOutputArray = sortFunctions[sortMode](suggestions[1]);
	let tableWidth = 6;
	let tableHeight = 100;
	wordOutput.innerHTML = "";
	for(let i = 0; i < tableHeight; i++)
	{
		let currRow = wordOutput.insertRow(i);
		for(let j = 0; j < tableWidth; j++)
		{
			let currCell = currRow.insertCell(j);
			let currData = wordOutputArray[(tableWidth*i)+j];
			currData = typeof currData !=  "undefined" ? currData : "";
			let wordLink = document.createElement("a");
			wordLink.appendChild(document.createTextNode(currData));
			wordLink.href = "#";
			wordLink.addEventListener("click", (x => addToOutput(currData)));
			currCell.appendChild(wordLink);
		}
	}
	
	console.log(ciphertextInput.innerText);
}

function clearInput()
{
	plaintextInput.value = "";
	ciphertextInput.innerText = "";
	updateAllOutput();
}

function addToOutput(word)
{
	ciphertextInput.innerText += word + " ";
	updateAllOutput();
}
	

plaintextInput.addEventListener("input", updateAllOutput);
ciphertextInput.addEventListener("input", updateAllOutput);
clearButton.addEventListener("click", clearInput);
modeInput.addEventListener("change", updateAllOutput);

updateAllOutput();
