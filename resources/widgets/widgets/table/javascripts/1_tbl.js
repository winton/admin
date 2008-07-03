/*
Generates a div-based table from an array of strings.

Example:
  // Inserts a 2 row, 2 column table into the top of $('id')
  Tbl('className', [ 'A', 'B', 'C', 'D' ], '%', 50, 50).inject($('id'), 'top');

Requires the following CSS to be present:
  .row
    :overflow hidden
    .parent
      :float left
      :display block

*/
var Tbl = function() {
  args = $A(arguments);
  
  var cname  = args.shift();
  var data   = $A(args.shift());
  var unit   = args.shift();
  var widths = $type(args[0]) == 'array' ? args[0] : args;
  
  var container = new Element('div', {
    'class':   cname + ' row',
    styles : { width: widths.sum() + unit }
  });
  
  var margin;
  (data.length).times(function(x) {
    var col = x % widths.length;
    if (col == 0) {
      margin  = widths.sum();
      margin -= widths[col];
    }
    var first_last = (col == 0 ? ' first' : col == widths.length -1 ? ' last' : '');
    var div = new Element('div', {
      'class': cname + col + ' ' + cname + '_parent parent' + first_last,
      styles: {
        'margin-right': col == 0 ? margin + unit       : null,
        'margin-left' : col != 0 ? '-' + margin + unit : null,
        'clear'       : col == 0 ? 'left'              : null,
        'width'       : widths[col] + unit
      }
    });
    var child = new Element('div', {
      'class': cname + '_cell cell' + first_last
    });
    child.innerHTML = data[x];
    div.adopt(child);
    container.adopt(div);
    if (col != 0)
      margin -= widths[col];
  });
  
  container.adopt(new Element('div', {
    styles: { clear: 'both' }
  }));
  return container;
};

Array.prototype.sum = function(){
	for(var i=0, sum=0; i<this.length; sum+=this[i++]);
	return sum;
};