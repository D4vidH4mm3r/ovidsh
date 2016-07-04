(function(){
    // guess which platform we are on
    var database = null;
    if (document.domain.search(/ebscohost/) >= 0) {
        database = "ebsco";
    } else if (document.domain.search(/ovidsp/) >= 0) {
        database = "ovid";
    } else {
        alert("It seems like this is neither Ovid nor EBSCOHOST (or maybe your browser has issues)");
        return;
    }

    // ensure that we have jQuery
    var v = "1.7.0";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                searchHistoryMain();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        searchHistoryMain();
    }

    function searchHistoryMain() {
        // find the things
        if (database == "ebsco") {
            function extractHits(e) {
                var text = e.children[0].textContent.trim();
                /* Looks like "View results(###)" */
                var start = text.search(/\(/);
                var stop  = text.search(/\)/);
                return text.substring(start+1, stop);
            }
            var ids = $(".searchID");
            var terms = $(".searchTerms");
            var options = $(".historyoptions");
            var hits = $(".actions");
        } else if (database == "ovid") {
            function extractHits(e) { return e.textContent; }
            var ids = $(".searchhistory-col-Num");
            var terms = $(".searchhistory-col-SearchHistory");
            var hits = $(".searchhistory-col-Results");
        }

        // build and display table
        var resTable = $("<table/>");
        var tr = $("<tr/>");
        tr.append($("<th/>").text("ID"));
        tr.append($("<th/>").text("term(s)"));
        if (database == "ebsco") {
            tr.append($("<th/>").text("option(s)"));
        }
        tr.append($("<th/>").text("results"));
        resTable.append(tr);
        for (var i = 1; i < ids.length; i++) {
            var tr = $("<tr/>");
            tr.append($("<td/>").text(ids[i].textContent.trim()));
            tr.append($("<td/>").text(terms[i].textContent.trim()));
            if (database == "ebsco") {
                tr.append($("<td/>").text(options[i].textContent.trim()));
            }
            tr.append($("<td/>").text(extractHits(hits[i])));
            resTable.append(tr);
        }

        var resDiv = $("<div/>")
            .append($("<span/>")
                    .text("Click anywhere outside this box to close it. " +
                          "Click the table to select it (then copy it somewhere)"))
            .css({
                position: "fixed",
                top: "40px",
                left: "5%",
                width: "90%",
                padding: "10px",
                border: "2px solid black"
            })
            .css("z-index", 1001)
            .css("background-color", "white");

        var resOverlay = $("<div/>");
        resOverlay.css({
            opacity: 0.7,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        });
        resOverlay.css("background-color", "black");
        resOverlay.css("z-index", 1000);

        resOverlay.on("click", function () {
            resDiv.remove();
            resTable.remove();
            resOverlay.remove();
        });

        resTable.on("click", function () {
            var body = document.body, range, sel;
            if (document.createRange && window.getSelection) {
                range = document.createRange();
                sel = window.getSelection();
                sel.removeAllRanges();
                try {
                    range.selectNodeContents(resTable[0]);
                    sel.addRange(range);
                } catch (e) {
                    range.selectNode(resTable[0]);
                    sel.addRange(range);
                }
            } else if (body.createTextRange) {
                range = body.createTextRange();
                range.moveToElementText(resTable[0]);
                range.select();
            }
        });

        resDiv.append(resTable);
        $("body").append(resOverlay);
        $("body").append(resDiv);
    }
})();
