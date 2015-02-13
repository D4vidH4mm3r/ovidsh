var ids   = document.getElementsByClassName("searchhistory-col-Num");
var terms = document.getElementsByClassName("searchhistory-col-SearchHistory");
var hits  = document.getElementsByClassName("searchhistory-col-Results");
var out   = "";

function extract(e) {
	return e.textContent;
}

for (var i = 1; i < ids.length; i++) {
	out = out + extract(ids[i]) + "\t" +
		extract(terms[i]) + "\t" +
		extract(hits[i]) + "\n";
}

var h = document.createElement("div");
document.body.appendChild(h);
h.innerHTML = "<div><pre>" + out + "<br/><br/>" + "</pre></div>";
