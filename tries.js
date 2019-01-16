// input to this function should be just letters! take out the spaces I am begging you!
function cipherToBin(txt)
{
	let r = "";
	let vowels = ["a","e","i","o","u","y"]
	for (var i = 0; i < txt.length; i++)
	{
		if(vowels.includes(txt.charAt(i).toLowerCase()))
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

function messageToPattern(msg)
{
	let r = [];
	for( let chr of msg )
	{
		r.push(chr.charCodeAt(0).toString(2));
	}
	return r.map((function(x) { while(x.length < 8) { x = "0" + x; } return x; })).join('');
}


function TrieNode(val, bin, ones, zeroes, end)
{
	this.val = val;
	this.bin = bin;
	this.ones = ones;
	this.zeroes = zeroes;
	this.end = end
	
	this.has = function(ch)
	{
		if(cipherToBin(ch) == "0")
		{
			side = this.zeroes;
		}
		else
		{
			side = this.ones;
		}
		for (let node of side)
		{
			if(node.val == ch)
			{
				return true;
			}
		}
		return false;
	}
	
	this.get = function(ch)
	{
		if(cipherToBin(ch) == "0")
		{
			side = this.zeroes;
		}
		else
		{
			side = this.ones;
		}
		for (let node of side)
		{
			if(node.val == ch)
			{
				return node;
			}
		}
		throw "trie does not contain "+ch;
	}
	
	this.getWord = function(w)
	{
		let currNode = this;
		while(w.length > 0)
		{
			currNode = currNode.get(w.charAt(0));
			w = w.substring(1);
		}
		return currNode;
	}
	
	this.addWord = function(w)
	{
		let currNode = this;
		let newNode;
		while(w.length > 0)
		{
			if (currNode.has(w.charAt(0)))
			{
				currNode = currNode.get(w.charAt(0));
			}
			else
			{
				newNode = new TrieNode(w.charAt(0), cipherToBin(w.charAt(0)), [], [], false);
				if(cipherToBin(w.charAt(0)) == "1")
				{
					currNode.ones.push(newNode);
				}
				else
				{
					currNode.zeroes.push(newNode);
				}
				currNode = newNode;
			}
			w = w.substring(1);
		}
		currNode.end = true;
		return this;
	}
}

function getSuggestions2(curr, patt, corp)
{
	let currWords = curr.split(" ");
	let currWord = currWords[currWords.length - 1];
	let currTxt = currWords.join("");
	let currBin = cipherToBin(currTxt);
	let remaining = patt.substring(currTxt.length, patt.length);
	if(currBin == patt)
	{
		return "<strong>Success!</strong>";
	}
	if(currBin != patt.substring(0, currTxt.length))
	{
		return "<strong>Your input does not match the pattern!</strong>";
	}
	try
	{
		let result = getTrieSuggestions(patt.substring(currTxt.length, patt.length), corp.getWord(currWord)).map(x => currWord.substring(0, currWord.length - 1) + x);
		if (result.length == 0)
		{
			return "<strong>No matching words found!</strong>";
		}
		else
		{
			return result;
		}
	}
	catch(e)
	{
		return "<strong>No matching words found!</strong>";
	}
}

function getTrieSuggestions(patt, trie)
{
	if(trie.end)
	{
		return [trie.val];
	}
	else
	{
		let results = [];
		let side = patt.charAt(0) == "1" ? trie.ones : trie.zeroes;
		for(let node of side)
		{
			results = results.concat(getTrieSuggestions(patt.substring(1), node));
		}
		return results.map(x => trie.val + x);
	}
}

//start a corpus
let trieCorpus = new TrieNode("", null, [], [], false);

//add words to corpus
for(word of testwords2)
{
	trieCorpus = trieCorpus.addWord(word);
}
console.log(trieCorpus);