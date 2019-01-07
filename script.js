"use strict";

let corpus = ["earthpea","airfield","aabba","lol","the", "yyzzy","them","thesaurus","they","then","theniorus"];

let sortedCorpus = makeSortedCorpus(corpus);
console.log(sortedCorpus);

let antiSortedCorpus = makeAntiSortedCorpus(corpus);
console.log(antiSortedCorpus);

function randomInt(bottom, top)
{
	let result = Math.floor(Math.random() * (top - bottom) + bottom);
	return result;
}

function makeSortedCorpus(corpus)
{
	let sorted = new Map();
	for(var i = 0; i < corpus.length; i++)
	{
		let word = corpus[i];
		let binWord = cipherToBin(word);
		if(sorted.has(binWord))
		{
			sorted.set(binWord, sorted.get(binWord).concat(word));
		}
		else
		{
			sorted.set(binWord, [word]);
		}
	}
	return sorted;
}

function makeAntiSortedCorpus(corpus)
{
	corpus = corpus.sort();
	let sorted = new Map();
	for (let w of corpus)
	{
		sorted.set(w, cipherToBin(w));
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

function getPartialSuggest(word, patt, corpus)
{
	let i = corpus.size;
}

function getFullSuggest(patt, corpus)
{
	let limit = patt.length;
	let result = [];
	while(limit > 0)
	{
		let currPatt = patt.substring(0,limit);
		if(corpus.has(currPatt))
		{
			result = result.concat(corpus.get(currPatt));
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