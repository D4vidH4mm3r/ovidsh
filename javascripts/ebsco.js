function makeTable() {
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
    function addElem(to, type, content) {
        var elem = document.createElement(type);
        elem.innerHTML = content;
        to.appendChild(elem);
    }
    var ids = document.getElementsByClassName("searchID");
    var terms = document.getElementsByClassName("searchTerms");
    var options = document.getElementsByClassName("historyoptions");
    var hits = document.getElementsByClassName("actions");
    var out = "ID	term(s)	options	results\n";
    var t = document.createElement("table");
    var tb = document.createElement("tbody");
    t.appendChild(tb);
    var tr = document.createElement("tr");
    addElem(tr, "th", "ID")
    addElem(tr, "th", "term(s)")
    addElem(tr, "th", "options")
    addElem(tr, "th", "results")
    tb.appendChild(tr);
    for (var i = 1; i < ids.length; i++) {
        tr = document.createElement("tr");
        addElem(tr, "td", extractId(ids[i]));
        addElem(tr, "td", extractTerms(terms[i]));
        addElem(tr, "td", extractOptions(options[i]));
        addElem(tr, "td", extractHits(hits[i]));
        tb.appendChild(tr);
    }
    return t;
}

var resTable = makeTable();

var resDiv = document.createElement("div");
resDiv.innerHTML = "Click anywhere outside this box to close it." +
" Click the table to select it (then copy it somewhere) <hr />";
resDiv.style.cssText = "background-color: white;" +
"z-index: 1001;" + "position: fixed;" + "float: left;" + "top: 40px;" + "left: 5%;" +
"width: 90%;" + "padding: 10px;" +
"border: 2px solid black;"

var resOverlay = document.createElement("div");
resOverlay.style.cssText = "background-color: black;" + "opacity: 0.7;" +
"z-index: 1000;" + "position: fixed;" + "top: 0;" + "left: 0;" +
"width: 100%;" + "height: 100%;"

resOverlay.onclick = function () {
    document.body.removeChild(resDiv);
    document.body.removeChild(resOverlay);
};
resTable.onclick = function () {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(resTable);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(resTable);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(resTable);
        range.select();
    }
};

resDiv.appendChild(resTable);
document.body.appendChild(resOverlay);
document.body.appendChild(resDiv);
