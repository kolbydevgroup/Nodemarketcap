$.getJSON( "../stats.js", function( yata );
document.getElementById("grvstat").innerText = yata.data[2][6];