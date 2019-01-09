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

let trieCorpus = new TrieNode("", null, [], [], true);


for(word of corpus)
{
	trieCorpus = trieCorpus.addWord(word);
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
	let side = patt.charAt(0) == "1" ? node.ones : node.zeroes;
	let sidearray = [];
	let endarray = [];
	if(side.size > 0)
	{
		sidearray = Array.from(side.values()).map((function(x) {return getTrieSuggestions(patt.substring(1), x, (function(y) {return f(y) + node.val}))})).flat();
	}
	if(node.end)
	{
		endarray = [f(node.val)];
	}
	return sidearray.concat(endarray);
}
