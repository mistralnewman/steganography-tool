"use strict";

let corpus = ["earthpea","airfield","aabba","lol","the"];

let sortedCorpus = makeSortedCorpus(corpus);
console.log(sortedCorpus);

function makeSortedCorpus(corpus)
{
	let sorted = {};
	for(var i = 0; i < corpus.length; i++)
	{
		let word = corpus[i];
		let binWord = cipherToBin(word);
		if(binWord in sorted)
		{
			sorted[binWord].push(word);
		}
		else
		{
			sorted[binWord] = [word];
		}
	}
	return sorted;
}

function getSuggestions(curr, patt)
{
	let txt = patt.split(" ").join("");
	let bin = cipherToBin(txt);
	let words = curr.split(" ");
	let remaining = bin.substring(txt.length,bin.length);
	if(curr.charAt(curr.length - 1) == " ")
	{
		let currWord = "";
		return getFullSuggest(remaining);
	}
	else
	{
		let currWord = words[words.length - 1];
		return getPartialSuggest(currWord, remaining);
	}
}

// here is stuff I haven't written yet!!!!
function getPartialSuggest(word, patt)
{
	return "oof";
}

function getFullSuggest(patt)
{
	return "oof";
	
}


// input to this function should be just letters! take out the spaces I am begging you!
function cipherToBin(txt) {
	let r = "";
	let vowels = ["a","e","i","o","u","y"]
	for (var i = 0; i < txt.length; i++)
	{
		if(vowels.includes(txt.charAt(i)))
		{
			r += "0";
		}
		else
		{
			r += "1";
		}
	}
	return r;
}

getSuggestions("eart","0011110000110011");