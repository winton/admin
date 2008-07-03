var Admin = new Class({
  initialize: function() {
    var body = $$('.body1 .cell')[0];
    
    this.reloadBody = function(el) {
      body.empty();
      body.setStyle('opacity', 0);
      if (el)
        el.inject(body, 'top');
      body.fade('in');
    };
  }
});