function extractText(e) {
	return e.textContent;
}

function removeTable() {
	var theTable   = document.getElementById("search-history-clean");
	var theOverlay = document.getElementById("search-history-overlay");
	document.body.removeChild(theTable);
	document.body.removeChild(theOverlay);
}

function makeTable() {
	var ids   = document.getElementsByClassName("searchhistory-col-Num");
	var terms = document.getElementsByClassName("searchhistory-col-SearchHistory");
	var hits  = document.getElementsByClassName("searchhistory-col-Results");
	var out   = "ID	term(s)	results\n";
	for (var i = 1; i < ids.length; i++) {
		out = out + extractText(ids[i]) + "\t" +
			extractText(terms[i]) + "\t" +
			extractText(hits[i]) + "\n";
	}
	return out;
}

var removeButton       = "<button onclick='removeTable()'>Remove this table</button><br><br>"

var overlay            = document.createElement("div");
document.body.appendChild(overlay);
overlay.onclick        = removeTable;
overlay.id             = "search-history-overlay";
overlay.style.cssText  = "background-color: black;" + "opacity: 0.7;" +
"z-index: 1000;" + "position: absolute;" + "top: 0;" + "left: 0;" +
"width: 100%;" + "height: 100%;"

var resTable           = document.createElement("div");
document.body.appendChild(resTable);
resTable.id            = "search-history-clean"
resTable.innerHTML     = removeButton + "<div><pre>" + makeTable() + "<br/><br/>" + "</pre></div>";
resTable.style.cssText = "background-color: white;" +
"z-index: 1001;" + "position: absolute;" + "float: left;" + "top: 40px;" +
"width: 956px;" + "padding: 10px;" +
"border: 2px solid black;"
