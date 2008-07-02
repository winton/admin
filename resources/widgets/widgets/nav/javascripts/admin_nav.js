var AdminNav = new Class({
  initialize: function() {    
    var over  = 'light_blue';
    var out   = 'grey';
    var click = 'orange';
    
    var body = $$('.body1 .cell')[0];
    var els  = $$('.nav .grey');
    
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
        var indicator = this.getElement('.indicator');
        indicator.fade('in');
        var request = new Request.HTML({
          evalScripts: true,
          onComplete: function(tree, elements) {
            body.empty();
            body.setStyle('opacity', 0);
            if (elements[0])
              elements[0].inject(body, 'top');
            body.fade('in');
            indicator.fade('out');
          }
        }).get('/admin/' + this.id);
      } else
        body.empty();
    });
  }
});