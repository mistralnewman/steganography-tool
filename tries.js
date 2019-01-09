let babyCorpus = ["abcde"];

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

let trieCorpus = new TrieNode("", null, [], [], true);


for(word of babyCorpus)
{
	trieCorpus = trieCorpus.addWord(word);
}
console.log(trieCorpus);

function getSuggestions2(curr, patt, corp)
{
	let currWords = curr.split(" ");
	let currWord = currWords[currWords.length - 1];
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
	return getTrieSuggestions(patt.substring(currTxt.length, patt.length), corp.getWord(currWord)).map(x => currWord + x);
}

function getTrieSuggestions(patt, trie)
{
	console.log("trie",trie);
	if(patt.length <= 1 && trie.end)
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
		if(trie.end)
		{
			results.push(trie.val);
		}
		return results.map(x => trie.val + x);
	}
}
