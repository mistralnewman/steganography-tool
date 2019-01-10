//let patternElem = document.getElementById("pattern");
let wordElem = document.getElementById("word");
let patternDiv = document.getElementById("display-pattern");
let textElem = document.getElementById("text");
let outputDiv = document.getElementById("text-output");
document.body.appendChild(outputDiv);
function updateAllOutput()
{
	let patt = messageToPattern(wordElem.value);
	outputDiv.innerHTML = getSuggestions2(textElem.value, patt, trieCorpus);
	//patternDiv.innerHTML = patternElem.value;
	patternDiv.innerHTML = patt;
}
updateAllOutput();