var Admin = new Class({
  initialize: function() {
    var body = $$('.body1 .cell')[0];
    
    this.addContent = function(el) {
      body.getChildren().hide();
      body.setStyle('opacity', 0);
      if (el)
        el.inject(body, 'top');
      body.fade('in');
    };
    
    this.back = function(no_show) {
      if (body.getFirst())
        body.getFirst().destroy();
      if (body.getFirst() && !no_show)
        body.getFirst().fadeIn();
    };
  }
});