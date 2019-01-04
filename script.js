"use strict";

let corpus = ["earthpea","airfield","aabba","lol","the"];

function getSuggestions(curr, patt) {
	let words = curr.split();
	if(curr.charAt(curr.length - 1) == " ")
	{
		let currWord = "";
	}
	else
	{
		let currWord = words[words.length - 1];
	}
	console.log(cipherToBin(curr));
}

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