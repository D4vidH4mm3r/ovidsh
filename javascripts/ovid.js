function extractText(e) {
	return e.textContent;
}

function removeTable() {
	var theTable = document.getElementById("search-history-clean");
	theTable.parentNode.removeChild(theTable);
}

function makeTable() {
	var ids   = document.getElementsByClassName("searchhistory-col-Num");
	var terms = document.getElementsByClassName("searchhistory-col-SearchHistory");
	var hits  = document.getElementsByClassName("searchhistory-col-Results");
	var out   = "";
	for (var i = 1; i < ids.length; i++) {
		out = out + extractText(ids[i]) + "\t" +
			extractText(terms[i]) + "\t" +
			extractText(hits[i]) + "\n";
	}
	return out;
}

var resTable       = document.createElement("div");
var removeButton   = "<button onclick='removeTable()'>Remove this table</button>"
resTable.id        = "search-history-clean"
resTable.innerHTML = removeButton + "<div><pre>" + makeTable() + "<br/><br/>" + "</pre></div>";
resTable.style     = "font-size: 12pt;";
document.body.appendChild(resTable);
