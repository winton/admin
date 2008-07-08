Element.implement({
  fadeIn: function(complete) {
    this.setStyle('opacity', 0);
    this.show();
    this.get('tween', {
      onComplete: complete ? complete.bind(this) : null,
      link: 'chain'
    }).start('opacity', 1);
  },
  fadeOut: function(complete) {
    this.setStyle('opacity', 1);
    this.show();
    this.get('tween', {
      onComplete: function() {
        if (complete) complete.bind(this)();
        this.hide();
      }.bind(this),
      link: 'chain'
    }).start('opacity', 0);
  },
  focusFirst: function(select) {
		var found = false;
		this.getElements('input, textarea').each(function(el) {
			if ((el.tagName == 'TEXTAREA' || el.type == 'text') && el.visible() && !found) {
			  el.focus();
				if (select) el.select();
				found = true;
			}
		});
	},
  hide: function() {
    this.setStyle('display', 'none');
  },
  show: function() {
    this.setStyle('display', '');
  },
  visible: function() {
		return (this.style.display != 'none');
	},
  zebra: function(class_name, column_count, only) {
    var do_it = true;
    this.getChildren().each(function(item, index) {
      var col = index % column_count;
      if (col == 0) do_it = !do_it;
      if (do_it && (!$chk(only) || only == col))
        item.addClass(class_name);
      else
        item.removeClass(class_name);
    });
  }
});