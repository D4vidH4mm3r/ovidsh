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

function makeTable() {
	var ids     = document.getElementsByClassName("searchID");
	var terms   = document.getElementsByClassName("searchTerms");
	var options = document.getElementsByClassName("historyoptions");
	var hits   = document.getElementsByClassName("actions");
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
resTable.innerHTML = "<div width=200 height=300><pre>" + makeTable() + "</pre></div>";
resTable.style     = "font-size: 12pt;";
var parentNode     = document.getElementById("content")
var beforeNode     = parentNode.getElementsByTagName("div")[0]
parentNode.insertBefore(resTable, beforeNode);
