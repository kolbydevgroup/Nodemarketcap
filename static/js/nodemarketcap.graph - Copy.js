/* Draw SVG */
function getCardSVGXValue(width, len, i) {
  if (len == 1) return 0;
  var n = width / (len - 1);
  return i * n == 0 ? 0 : i * n - 1;
};
function getCardSVGYValue(height, value, max_value, min_value) {
  var mid = ((height -1) / 2);
  var value_mid = ((max_value + min_value) / 2);
  if(max_value == min_value) {
    var v = mid;
  } else {
    var v = (value - min_value) / (max_value - min_value) * (height - 1);
  }
  return height - 1 - v;
};
function drawCardSVGBackground(svgId, pathId, values, isFill) {
  var svg = document.getElementById(svgId);
  var width = svg.getBoundingClientRect().width;
  var height = svg.getBoundingClientRect().height;
  
  var max_value = -1;
  var min_value = 999999999999;
  for(var i = 0; i < values.length; i++) {
    if(values[i] > max_value) max_value = values[i];
    if(values[i] < min_value) min_value = values[i];
  }

  var path = "";
  if (isFill) {
    path = "M0 " + (height - 1) + " L0 ";
  } else {
    path = "M0 ";
  }
  for(var i = 0; i < values.length; i++) {
    if (i == 0) {
      path += getCardSVGYValue(height, values[i], max_value, min_value);
    } else {
      path += " L" + getCardSVGXValue(width, values.length, i);
      path += " " + getCardSVGYValue(height, values[i], max_value, min_value);
    }
  }

  if(isFill) {
    path += " L" + getCardSVGXValue(width, values.length, values.length - 1) + " " + (height - 1);
  }

  var p = document.getElementById(pathId);
  p.setAttribute("d", path);
};
