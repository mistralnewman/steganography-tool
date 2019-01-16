//let patternElem = document.getElementById("pattern");
let wordElem = document.getElementById("word");
let patternOutput = document.getElementById("display-pattern");
let textElem = document.getElementById("text");
let outputTable = document.getElementById("text-output");
let statusOutput = document.getElementById("status-message");

let statuses = {
	0: { message: "Success!", color: "#d2ffbc" },
	1: { message: "So far so good!", color: "#fffba2" },
	2: { message: "No matching words found!", color: "#ffc08b" },
	3: { message: "Your input does not match!", color: "#ffaeae" }
}

function updateAllOutput()
{
	let patt = messageToPattern(wordElem.value);
	patternOutput.value = patt;
	let suggestions = getSuggestions(textElem.value, patt, trieCorpus);
	let statusMessage = suggestions[0];
	statusOutput.innerHTML = "<strong>Status:</strong> "+statuses[statusMessage].message;
	statusOutput.style.backgroundColor = statuses[statusMessage].color;
	console.log(statuses[statusMessage].color);
	let outputArray = suggestions[1]
	let tableWidth = 6;
	let tableHeight = 6;
	outputTable.innerHTML = "";
	for(let i = 0; i < tableHeight; i++)
	{
		let currRow = outputTable.insertRow(i);
		for(let j = 0; j < tableWidth; j++)
		{
			let currCell = currRow.insertCell(j);
			let currData = outputArray[(tableWidth*i)+j];
			currCell.innerHTML = typeof currData !=  "undefined" ? currData : "";
		}
	}
}
updateAllOutput();