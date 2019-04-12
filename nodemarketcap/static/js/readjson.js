function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("/Users/Documents/workspace/test.json", function (text) {
    var scriv = JSON.parse(text);

});
readTextFile("../scriv.json", function (text) {
    var curium = JSON.parse(text);

});