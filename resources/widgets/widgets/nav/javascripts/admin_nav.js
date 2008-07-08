var AdminNav = new Class({
  initialize: function() {    
    var over  = 'light_blue';
    var out   = 'grey';
    var click = 'orange';
    
    var els = $$('.nav .grey');
    var me  = this;
    
    this.reloadTable = function() {
      var indicator = this.selected.getElement('.indicator');
      indicator.fade('in');
      var request = new Request.HTML({
        evalScripts: false,
        onComplete: function(tree, elements, html, js) {
          Global.Admin.addContent(elements[0]);
          indicator.fade('out');
          eval(js);
        }
      }).get('/admin/' + this.selected.id);
    };
    
    els.addEvent('mouseenter', function() {
      if (this.hasClass(click)) return;
      this.removeClass(out);
      this.addClass(over);
    });
    
    els.addEvent('mouseleave', function() {
      if (this.hasClass(click)) return;
      this.removeClass(over);
      this.addClass(out);
    });
    
    els.addEvent('click', function() {
      els.each(function(item) { if (item != this) item.removeClass(click); }, this);
      els.addClass(out);
      this.removeClass(out);
      this.toggleClass(over);
      this.toggleClass(click);
      if (this.hasClass(click)) {
        me.selected = this;
        me.reloadTable();
      } else
        $$('.body1 .cell').empty();
    });
  }
});