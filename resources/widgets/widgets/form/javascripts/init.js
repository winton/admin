Global['<%= id %>'].addEvents({
  complete: function(el, js) {
    if (el) Global.dialog.render({ element: el });
    if (js) eval(js);
    if (!el) {
      Global.dialog.hide();
      Global[Global.current_table].reload();
    }
  }
});
Global['<%= id %>'].form.addEvent('keyup', function(e) {
  if (e.key == 'esc') Global.dialog.hide();
});