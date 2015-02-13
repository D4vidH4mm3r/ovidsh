function extractId(e) {
	return e.children[0].textContent;
}

function extractTerms(e) {
	return e.children[1].textContent;
}

function extractOptions(e) {
	return trim(e.children[0].textContent);
}

function extractHits(e) {
	var text = trim(e.children[0].textContent);
	/* Typisk "View results(###)" */
	var start = text.search(/\(/);
	var stop  = text.search(/\)/);
	return text.substring(start+1,stop);
}

function trim(t) {
	return t.replace(/[ \n\t]+/gm, " ").strip();
}

function removeTable() {
	var theTable = document.getElementById("search-history-clean");
	theTable.parentNode.removeChild(theTable);
}

function makeTable() {
	var ids     = document.getElementsByClassName("searchID");
	var terms   = document.getElementsByClassName("searchTerms");
	var options = document.getElementsByClassName("historyoptions");
	var hits    = document.getElementsByClassName("actions");
	var out = "";
	for (var i = 1; i < ids.length; i++) {
		out = out + extractId(ids[i]) + "\t" +
			extractTerms(terms[i]) + "\t" +
			extractOptions(options[i]) + "\t" +
			extractHits(hits[i]) + "\n";
	}
	return out;
}

var resTable       = document.createElement("div");
var removeButton   = "<button onclick='removeTable()'>Remove this table</button>"
resTable.id        = "search-history-clean";
resTable.innerHTML = removeButten + "<div><pre>" + makeTable() + "</pre></div>";
var parentNode     = document.getElementById("content")
var beforeNode     = parentNode.getElementsByTagName("div")[0]
parentNode.insertBefore(resTable, beforeNode);
