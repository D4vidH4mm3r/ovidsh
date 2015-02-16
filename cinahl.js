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

function makeRemover(table, overlay) {
	return function() {
		document.body.removeChild(table);
		document.body.removeChild(overlay);
	}
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

var removeButton = "<button onclick='resRemove()'>Remove this table</button>"

var resTable           = document.createElement("div");
resTable.innerHTML     = removeButton + "<div><pre>" + makeTable() + "</pre></div>";
resTable.style.cssText += "background-color: white;" +
"z-index: 1001;" + "position: fixed;" + "float: left;" + "top: 40px;" + "left: 5%;" +
"width: 90%;" + "padding: 10px;" +
"border: 2px solid black;"

var resOverlay           = document.createElement("div");
resOverlay.style.cssText = "background-color: black;" + "opacity: 0.7;" +
"z-index: 1000;" + "position: fixed;" + "top: 0;" + "left: 0;" +
"width: 100%;" + "height: 100%;"

var resRemove      = makeRemover(resTable, resOverlay);
resOverlay.onclick = resRemove;

document.body.appendChild(resOverlay);
document.body.appendChild(resTable);
