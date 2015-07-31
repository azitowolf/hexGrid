// input form allows user to choose between layouts - basic or circle + size + straight or offset orientation

var $targetDiv = $(".hexGrid");
var $input = $('#layoutDropdown');
var $layoutDropDown = $('#dropdown-menu-layout');
var $rowsDropDown = $('#dropdown-menu-rows');
var $columnsDropDown = $('#dropdown-menu-columns');
var $renderBtn = $('#renderBtn');
var gridHeight = 1;
var gridWidth = 1;
var layout = '';

$layoutDropDown.on('click', 'a', function(event) {
  event.preventDefault();
  var $t = $(this);
  var text = $t.text();
  layout = text;
  $input.html('');
  $input.html(text);
});

$rowsDropDown.on('click', 'a', function(event) {
  event.preventDefault();
  var $t = $(this);
  var number = $t.text();
  $('#rowsDropDown').html('Width: ' + number);
  gridWidth = number;
});

$columnsDropDown.on('click', 'a', function(event) {
  event.preventDefault();
  var $t = $(this);
  var number = $t.text();
  $('#columnsDropDown').html('Height: ' + number);
  gridHeight = number;
});

$renderBtn.click(function(event) {
  event.preventDefault();
  $targetDiv.html('');
  layout === 'Circular' ? $targetDiv.append(renderCircleGrid(1)) : $targetDiv.append(renderStandardGrid(gridWidth, gridHeight))
});

//Render Functions

var renderHex = function(even, hidden) {
  var classes = even ? hidden ? 'even filler' : 'even' : hidden ? 'filler ' : '';
  var html = "<div class='hex " + classes +
    "'><div class='hex-left'></div><div class='hex-middle'></div><div class='hex-right'></div></div>";
  return html;
}

var renderRow = function(length, inverse, offset) {
  var html = '';
  if (offset) {
    html += renderHex(false, true)
  }
  for (var i = 0; i < length; i++) {
    if (i % 2 === 0) {
      html += renderHex(inverse, false);
    } else {
      html += renderHex(!inverse, false);
    }
  };

  var rowStart = "<div class='hex-row'>";
  var rowEnd = "</div>";
  return rowStart + html + rowEnd;
}

var renderStandardGrid = function(rows, columns) {
  var html = '';
  var i = 0;
  while (i < columns) {
    html += renderRow(rows, false, false)
    i++;
  };
  var containerOpen = '<div class="board">';
  var containerClose = '</div>'
  return containerOpen + html + containerClose;
};

var renderCircleGrid = function(size) {
  var html = '';
  switch (size) {
    case 1:
      html += renderRow(1, true, true);
      html += renderRow(3, false, false);
      html += renderRow(3, false, false);
      break;
    case 2:
      html += renderRow(3, true, true);
      html += renderRow(5, false, false);
      html += renderRow(5, false, false);
      html += renderRow(5, false, false);
      html += renderRow(3, true, true);
      break;
  }
  var containerOpen = '<div class="board">';
  var containerClose = '</div>'
  return containerOpen + html + containerClose;
};

var renderGrid = function(layout) {
  layout === 'Circular' ? $targetDiv.append(renderCircleGrid(1)) : $targetDiv.append(renderStandardGrid(gridWidth, gridHeight))
}


$targetDiv.append(renderStandardGrid(5, 3));
