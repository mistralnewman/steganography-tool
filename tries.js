function TrieNode(val, bin, ones, zeroes, end)
{
	this.val = val;
	this.bin = bin;
	this.ones = ones;
	this.zeroes = zeroes;
	this.end = end;
}

let trieCorpus = new TrieNode("start+", null, new Map(), new Map(), false);

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
	if(side.has(currChar))
	{
		if(end)
		{
			side.get(currChar).end = true;
		}
		else
		{
			side.set(currChar, addToTrie(word.substring(1, word.length), side.get(currChar)));
		}
	}
	else
	{
		let newNode = new TrieNode(currChar, charBin, new Map(), new Map(), end);
		if(!end)
		{
			newNode = addToTrie(word.substring(1, word.length), newNode);
		}
		side.set(currChar, newNode);
	}
	return trie;
}

for(word of corpus)
{
	trieCorpus = addToTrie(word, trieCorpus);
}
console.log(trieCorpus);

function getSuggestions2(curr, patt, corpus)
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
	if(currBin != remaining)
	{
		return "Uhhh buddy you messed up";
	}
	return getTrieSuggestions(currWord, patt.substring(currTxt.length, patt.length), corpus);
}

function getTrieSuggestions(word, patt, corpus)
{
	return "not yet implemented";
}