var res = window.location.protocol + "//";
if (window.location.protocol == "https:") {
    res += window.location.host.replace(/\./g, "-") + ".proxy2-bib.sdu.dk";
} else {
    res += window.location.host + ".proxy2-bib.sdu.dk:2048";
}
res += window.location.pathname;
window.location.href = res;
