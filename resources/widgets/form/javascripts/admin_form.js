var AdminForm = new Class({
  initialize: function() {
    var form = $$('form')[0];
    var submit = form.getElements('input').filter(function(item) {
      return item.getProperty('type') == 'submit';
    })[0];
    var div = new Element('div', {
      id: 'submit',
      html: 'Submit',
      events: {
        click: function() {
          if (form.get('submitted')) return false;
          form.set('submitted', true);
          new Request.HTML({
            url: form.getProperty('action'),
            method: 'post',
            evalScripts: false,
            onComplete: function(tree, elements, html, js) {
              if (elements[0]) {
                elements[0].replaces(form.getParent());
                $$('.field_error').each(function(item) {
                  item.inject(item.getParent(), 'bottom');
                });
              } else
                Global.AdminNav.reloadTable();
              eval(js);
            }
          }).send(form.toQueryString());
          return false;
        }
      }
    });
    div.replaces(submit);
    var cancel = new Element('div', {
      id: 'cancel',
      html: 'Cancel',
      events: {
        click: function() {
          Global.Admin.back();
          return false;
        }
      }
    }).inject(div, 'before');
  }
});