"use strict";

let corpus = ["earthpea","airfield","aabba","lol","the", "yyzzy"];

let sortedCorpus = makeSortedCorpus(corpus);
console.log(sortedCorpus);

function randomInt(bottom, top)
{
	let result = Math.floor(Math.random() * (top - bottom) + bottom);
	return result;
}

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

function getSuggestions(curr, patt, corpus)
{
	let currWords = curr.split(" ");
	let currTxt = currWords.join("");
	let currBin = cipherToBin(currTxt);
	
	let remaining = patt.substring(currTxt.length,patt.length);
	
	if(curr == "" || curr.charAt(curr.length - 1) == " ")
	{
		let currWord = "";
		return getFullSuggest(remaining, corpus);
	}
	else
	{
		let currWord = currWords[currWords.length - 1];
		return getPartialSuggest(currWord, remaining, corpus);
	}
}

function easyGetSuggestions(value)
{
	getSuggestions(value, "110", sortedCorpus);
}

function getPartialSuggest(word, patt, corpus)
{
	return "oof";
}

function getFullSuggest(patt, corpus)
{
	let limit = patt.length;
	let result = [];
	while(limit > 0)
	{
		let currPatt = patt.substring(0,limit);
		if(currPatt in corpus)
		{
			result = result.concat(corpus[currPatt]);
		}
		limit--;
	}
	return result;
	
}


// input to this function should be just letters! take out the spaces I am begging you!
function cipherToBin(txt)
{
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

console.log(getSuggestions("earthpea ","0011110000110011", sortedCorpus));