function extractText(e) {
	return e.textContent;
}

function makeRemover(table, overlay) {
	return function() {
		document.body.removeChild(table);
		document.body.removeChild(overlay);
	}
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

var removeButton = "<button onclick='resRemove()'>Remove this table</button><br><br>"

var resOverlay = document.createElement("div");
resOverlay.style.cssText = "background-color: black;" + "opacity: 0.7;" +
"z-index: 1000;" + "position: fixed;" + "top: 0;" + "left: 0;" +
"width: 100%;" + "height: 100%;"

var resTable           = document.createElement("div");
resTable.innerHTML     = removeButton + "<div><pre>" + makeTable() + "<br/><br/>" + "</pre></div>";
resTable.style.cssText = "background-color: white;" +
"z-index: 1001;" + "position: fixed;" + "float: left;" + "top: 40px;" +
"width: 956px;" + "padding: 10px;" +
"border: 2px solid black;"

var resRemove = makeRemover(resTable, resOverlay);
resOverlay.onclick = resRemove;
document.body.appendChild(resOverlay);
document.body.appendChild(resTable);
