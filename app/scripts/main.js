//planning

// input form allows user to choose between layouts - basic or circle + size + straight or offset orientation

var $input = $('#layoutDropdown');
var $board = $('.board');
var $dropDown = $('.dropdown-menu');
var renderType = 'Circle';

$dropDown.on('click', 'a', function(event) {
  event.preventDefault();
  var $t = $(this);
  var text = $t.text();
  $input.html('');
  $input.html(text);
  var layout = text;

  $('.marketing').html('');
  $('.marketing').append(renderGrid(layout));

});

var render = function() {

};

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



var renderGrid = function(layout) {

  var html = '';
  if (layout === 'Circular') {

    html += renderRow(1, true, true);
    html += renderRow(3, false, false);
    html += renderRow(3, false, false);



  } else {

    html += renderRow(5, false, false);
    html += renderRow(5, false, false);
    html += renderRow(5, false, false);
    html += renderRow(5, false, false);

  }





  var containerOpen = '<div class="board col-sm-offset-1 col-sm-10">';
  var containerClose = '</div>'

  return containerOpen + html + containerClose;
};



// $('.marketing').append(renderGrid());
