function makeTable() {
    function extractText(e) {
        return e.textContent;
    }
    function addElem(to, type, content) {
        var elem = document.createElement(type);
        elem.innerHTML = content;
        to.appendChild(elem);
    }
    var t = document.createElement("table");
    var tb = document.createElement("tbody");
    t.appendChild(tb);
    var ids   = document.getElementsByClassName("searchhistory-col-Num");
    var terms = document.getElementsByClassName("searchhistory-col-SearchHistory");
    var hits  = document.getElementsByClassName("searchhistory-col-Results");
    var tr = document.createElement("tr");
    addElem(tr, "th", "#");
    addElem(tr, "th", "Search terms");
    addElem(tr, "th", "Results");
    tb.appendChild(tr);
    for (var i = 1; i < ids.length; i++) {
        tr = document.createElement("tr");
        addElem(tr, "td", extractText(ids[i]));
        addElem(tr, "td", extractText(terms[i]));
        addElem(tr, "td", extractText(hits[i]));
        tb.appendChild(tr);
    }
    return t;
}

var resTable = makeTable();

var resDiv = document.createElement("div");
resDiv.innerHTML = "Click anywhere outside this box to close it." +
" Click the table to select it (then copy it somewhere) <hr />";
resDiv.style.cssText = "background-color: white;" +
"z-index: 1001;" + "position: fixed;" + "float: left;" + "top: 40px;" +
"min-width: 800px;" + "padding: 10px;" +
"border: 2px solid black;"

var resOverlay = document.createElement("div");
resOverlay.style.cssText = "background-color: black;" + "opacity: 0.7;" +
"z-index: 1000;" + "position: fixed;" + "top: 0;" + "left: 0;" +
"width: 100%;" + "height: 100%;";

resOverlay.onclick = function () {
    document.body.removeChild(resDiv);
    document.body.removeChild(resOverlay);
};
resTable.onclick = function () {
    // selection script from http://stackoverflow.com/a/2044793
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
}

resDiv.appendChild(resTable);
document.body.appendChild(resOverlay);
document.body.appendChild(resDiv);
