var ids = document.getElementsByClassName("searchhistory-col-Num");
var terms = document.getElementsByClassName("searchhistory-search-term");
var hits = document.getElementsByClassName("searchhistory-col-Results");
var out1 = "";
var out2 = "";
for (var i = 0; i < ids.length - 1; i++) {
    var id = ids[i + 1].innerHTML;
    var term = terms[i].innerHTML;
    var hit = hits[i + 1].innerHTML;
    out1 = out1 + id + "\t" + term + "\t" + hit + "\n";
    out2 = out2 + term + "\n";
}
var h = document.createElement("div");
document.body.appendChild(h);
h.innerHTML = "<div width=200 height=300><pre>" + out1 + "<br/><br/>" + out2 + "</pre></div>";