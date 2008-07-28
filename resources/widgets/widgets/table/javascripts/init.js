Global['<%= id %>'].addEvents({
  newComplete: function(el, js) {
    Global.dialog.render({ element: el });
    Global.current_table = '<%= id %>';
    eval(js);
  },
  editComplete: function(el, js) {
    Global.dialog.render({ element: el });
    Global.current_table = '<%= id %>';
    eval(js);
  },
  deleteComplete: function(json) {}
});