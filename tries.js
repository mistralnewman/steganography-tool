let vowels = "aeiouy".split('');
let stopchars = " .,?!'\"():;".split('');
function cipherToBin(txt)
{
	let r = "";
	for (var i = 0; i < txt.length; i++)
	{
		if(vowels.includes(txt.charAt(i).toLowerCase()))
		{
			r += "0";
		}
		else if(stopchars.includes(txt.charAt(i)))
		{
			r += "";
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

function getSuggestions(curr, patt, corp)
{
	let currWords = curr.replace(/[.,?!'\\"():;]/g,"").split(/[\xa0 ]/);
	let currWord = currWords[currWords.length - 1];
	let currTxt = currWords.join("");
	let currBin = cipherToBin(currTxt);
	let remaining = patt.substring(currTxt.length, patt.length);
	let state;
	let result = [];
	try
	{
		result = getTrieSuggestions(patt.substring(currTxt.length, patt.length), corp.getWord(currWord)).map( x => (currWord.substring(0, currWord.length - 1) + x));
		if (result.length == 0)
		{
			state = 2;
		}
		else
		{
			state = 1;
		}
	}
	catch(e)
	{
		state = 2;
		result = [];
	}
	if(currBin == patt)
	{
		state = 0;
		result = [];
	}
	if(currBin != patt.substring(0, currTxt.length))
	{
		state = 3;
		result = [];
	}
	return [state, result];
}

function getTrieSuggestions(patt, trie)
{
	if(trie.end)
	{
		return [trie.val];
	}
	if(patt.length < 1)
	{
		return [];
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

// thanks stack overflow
function loadDocument(docName) {
	var result = null;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", docName, false);
	xhttp.send();
	if(xhttp.status == 200) {
		result = xhttp.responseText;
	}
	return result;
}
let words;
try {
	// corpus is from here https://github.com/first20hours/google-10000-english
	// but hosted on Oberlin servers
	// because I don't want github to get mad at me
	words = loadDocument("google-10000-english.txt").split("\n");
}
catch(error)
{
	// if we're here, we're probably testing locally!
	// or the corpus stopped existing for some reason
	// use a tiny local corpus
	words = ['the', 'of', 'and', 'to', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 'this', 'with', 'i', 'you', 'it', 'not', 'or', 'be', 'are', 'from', 'at', 'as', 'your', 'all', 'have', 'new', 'more', 'an', 'was', 'we', 'will', 'home', 'can', 'us', 'about', 'if', 'page', 'my', 'has', 'search', 'free', 'but', 'our', 'one', 'other', 'do', 'no', 'information', 'time', 'they', 'site', 'he', 'up', 'may', 'what', 'which', 'their', 'news', 'out', 'use', 'any', 'there', 'see', 'only', 'so', 'his', 'when', 'contact', 'here', 'business', 'who', 'web', 'also', 'now', 'help', 'get', 'pm', 'view', 'online', 'c', 'e', 'first', 'am', 'been', 'would', 'how', 'were', 'me', 's', 'services', 'some', 'these', 'click', 'its', 'like', 'service', 'x', 'than', 'find', 'price', 'date', 'back', 'top', 'people', 'had', 'list', 'name', 'just', 'over', 'state', 'year', 'day', 'into', 'email', 'two', 'health', 'n', 'world', 're', 'next', 'used', 'go', 'b', 'work', 'last', 'most', 'products', 'music', 'buy', 'data', 'make', 'them', 'should', 'product', 'system', 'post', 'her', 'city', 't', 'add', 'policy', 'number', 'such', 'please', 'available', 'copyright', 'support', 'message', 'after', 'best', 'software', 'then', 'jan', 'good', 'video', 'well', 'd', 'where', 'info', 'rights', 'public', 'books', 'high', 'school', 'through', 'm', 'each', 'links', 'she', 'review', 'years', 'order', 'very', 'privacy', 'book', 'items', 'company', 'r', 'read', 'group', 'sex', 'need', 'many', 'user', 'said', 'de', 'does', 'set', 'under', 'general', 'research', 'university', 'january', 'mail', 'full', 'map', 'reviews', 'program', 'life']
}

//start a corpus
let trieCorpus = new TrieNode("", null, [], [], false);

//add words to corpus
for(word of words)
{
	trieCorpus = trieCorpus.addWord(word);
}
console.log(trieCorpus);