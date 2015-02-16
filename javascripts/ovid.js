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

function makeSelect(e) {
	return function() {
		e.focus();
		e.select();
	}
}

var resTable = makeTable();

var resText = document.createElement("textarea");
resText.rows = resTable.split("\n").length;
resText.style.cssText = "width: 100%;";
resText.innerHTML = resTable;

var resDiv = document.createElement("div");
resDiv.innerHTML = "Click anywhere outside this box to close it.";
resDiv.style.cssText = "background-color: white;" +
"z-index: 1001;" + "position: fixed;" + "float: left;" + "top: 40px;" +
"min-width: 800px;" + "padding: 10px;" +
"border: 2px solid black;"

var resOverlay = document.createElement("div");
resOverlay.style.cssText = "background-color: black;" + "opacity: 0.7;" +
"z-index: 1000;" + "position: fixed;" + "top: 0;" + "left: 0;" +
"width: 100%;" + "height: 100%;";

resOverlay.onclick = makeRemover(resDiv, resOverlay);
resText.onclick = makeSelect(resText);

resDiv.appendChild(resText);
document.body.appendChild(resOverlay);
document.body.appendChild(resDiv);
