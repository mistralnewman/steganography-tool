function TrieNode(val, bin, ones, zeroes, end)
{
	this.val = val;
	this.bin = bin;
	this.ones = ones;
	this.zeroes = zeroes;
	this.end = end;
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
		console.log("get",ch);
		if(!this.has(ch))
		{
			throw "trie does not contain "+ch.charCodeAt(0)+"!";
		}
		if(cipherToBin(ch) == "0")
		{
			side = this.zeroes;
		}
		else
		{
			side = this.ones;
		}
		return side.get(ch);
	}
	
	this.getWord = function(w)
	{
		let i = 0;
		let currNode = this;
		console.log("currnode", currNode);
		while(i < w.length)
		{
			currNode = currNode.get(w.charAt(i));
			i++;
		}
		return currNode;
	}
		
}

let trieCorpus = new TrieNode("", null, [], [], false);

console.log(trieCorpus);

function addToTrie(word, trie)
{
	let end = word.length <= 1;
	let currChar = word.charAt(0);
	let charBin = cipherToBin(currChar);
	let side;
	if(charBin == "1")
	{
		side = trie.ones;
	}
	else
	{
		side = trie.zeroes;
	}
	let i = 0;
	while(i < side.length && side[i].val != currChar)
	{
		i++;
	}
	if(i >= side.length)
	{
		let newNode = new TrieNode(currChar, charBin, [], [], end);
		if(!end)
		{
			newNode = addToTrie(word.substring(1), newNode);
		}
		side = side.push(newNode);
		charBin == "1" ? trie.ones = side : trie.zeroes = side;
	}
	else
	{
		let node = side[i];
		console.log("node", node);
		if(end)
		{
			node.end = true;
		}
		else
		{
			node = addToTrie(word.substring(1), node);
		}
	}
	console.log(trie);
	return trie;
}

for(word of corpus)
{
	trieCorpus = addToTrie(word, trieCorpus);
}
console.log(trieCorpus);

function getSuggestions2(curr, patt, corp)
{
	let currWords = curr.split(" ");
	let currWord = currWords[currWords.length - 1];
	console.log(currWord);
	let currTxt = currWords.join("");
	let currBin = cipherToBin(currTxt);
	let remaining = patt.substring(currTxt.length, patt.length);
	if(currBin == patt)
	{
		return "<strong>NICE</strong>";
	}
	if(currBin != patt.substring(0, currTxt.length))
	{
		return "Uhhh buddy you messed up";
	}
	return getTrieSuggestions(patt.substring(currTxt.length, patt.length), corp.getWord(currWord), (function(x) {return x;})).map(x => currWord + x);
}

function getTrieSuggestions(patt, node, f)
{
	console.log("pattern", patt);
	let side = patt.charAt(0) == "1" ? node.ones : node.zeroes;
	//console.log(node.val);
	let sidearray = [];
	let endarray = [];
	if(side.size > 0)
	{
		sidearray = Array.from(side.values()).map((function(x) {return getTrieSuggestions(patt.substring(1), x, (function(y) {return f(y) + node.val}))})).flat();
		//console.log("side", sidearray);
	}
	if(node.end)
	{
		endarray = [f(node.val)];
		//console.log("end", endarray);
	}
	return sidearray.concat(endarray);
}
