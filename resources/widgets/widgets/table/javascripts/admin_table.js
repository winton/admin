var AdminTable = new Class({
  initialize: function(options) {
    var container   = $(options.id).getElement('.table');
    var indicator   = container.getElement('.indicator');
    var table_links = container.getElement('.table_links');
    var headers, rows, menu;
    var me = this;
    
    new Request.JSON({
      url: options.index_resource,
      onComplete: function(json){
        $extend(options, json);
        var columns = options.columns.map(function(item) {
          return '<div class="arrow down"></div>' + item + '';
        });
        headers = Tbl('table_headers', columns, '%', options.widths);
        headers.getElements('.cell').addClass('light_blue');
        headers.inject(container, 'bottom');
        this.attachHeaders();
        this.reloadRows();
        indicator.hide();
        table_links.fadeIn();
      }.bind(this)
    }).get();
    
    table_links.getElements('a').addEvent('click', function() {
      new Request.HTML({
        url: this.get('href'),
        evalScripts: false,
        onComplete: function(tree, elements, html, js) {
          Global.Admin.reloadBody(elements[0]);
          eval(js);
        }
      }).get();
      return false;
    });
    
    this.reloadRows = function() {
      rows = Tbl('table_rows', options.data, '%', options.widths);
      rows.getChildren().each(function(item, index) {
        var id_index = index / options.columns.length;
        if (index % options.columns.length == 0 && options.ids[id_index])
          item.id = options.id + '_' + options.ids[id_index];
      });
      rows.inject(container, 'bottom');
      rows.zebra('zebra', options.columns.length);
      this.attachRows();
    };
    
    this.attachRows = function() {
      var r = rows.getElements('.table_rows_cell');
      r.addEvent('mouseenter', function() {
        var row = me.rowFromParent(this.getParent());
        row.each(function(item) {
          if (item.hasClass('zebra_orange')) item.set('was_orange', true);
          else item.addClass('zebra_orange');
        });
      });
      r.addEvent('mouseleave', function() {
        var row = me.rowFromParent(this.getParent());
        row.each(function(item) {
          if (item.get('was_orange')) return;
          item.removeClass('zebra_orange');
        });
      });
      var html;
      
      r.addEvent('click', function(e) {
        if (menu) menu.destroy();
        menu = new Element('div', {
          'class': 'table_menu',
          styles: {
            top: e.client.y,
            left: e.client.x,
            opacity: 0
          },
          html: options.row_links.map(function(item) {
            return '<a href="' + item.resource + '">' + item.title + '</a>';
          }).join('<br/>')
        });
        menu.inject(document.body, 'bottom');
        menu.getElements('a').addEvent('click', function() {
          var row_link = options.row_links.filter(function(item) {
            return item.title == this.textContent;
          }, this)[0];
          if (item.resource.contains('.json'))
            new Request.JSON({
              url: row_link.resource,
              onComplete: function(json){
                if (json.message)
                  alert(json.message);
              }.bind(this)
            }).get({ id: me.idFromParent(e.target.getParent()) });
          else
            new Request.HTML({
              url: row_link.resource,
              evalScripts: false,
              onComplete: function(tree, elements, html, js) {
                Global.Admin.reloadBody(elements[0]);
                eval(js);
              }
            }).get({ id: me.idFromParent(e.target.getParent()) });
          menu.fade('out');
          return false;
        });
        menu.fade('in');
        return false;
      });
      document.addEvent('click', function(e) {
        if (e.target != menu && menu)
          menu.destroy();
      });
    };
    
    this.rowFromParent = function(parent) {
      var parents = $A([ parent ]), el = parent;
      if (!el.hasClass('first')) {
        while(el && !el.hasClass('first')) {
          el = el.getPrevious();
          parents.push(el);
        }
      }
      el = parent;
      if (!el.hasClass('last')) {
        while(el && !el.hasClass('last')) {
          el = el.getNext();
          parents.push(el);
        }
      }
      return parents;
    };
    
    this.idFromParent = function(parent) {
      return this.rowFromParent(parent).filter(function(item) {
        return item.hasClass('first');
      })[0].id.replace(/\D/g, '');
    };
    
    this.attachHeaders = function() {
      var h = headers.getElements('.table_headers_cell');
      h = h.filter(function(item) { return options.sortable[item.textContent]; });
      h.addEvent('mouseenter', function() {
        if (this.get('sort')) return;
        this.removeClass('light_blue');
        this.addClass('orange');
      });
      h.addEvent('mouseleave', function() {
        if (this.get('sort')) return;
        this.removeClass('orange');
        this.addClass('light_blue');
      });
      h.addEvent('click', function() {
        if (!this.get('sort')) {
          var other = h.filter(function(item) { return item != this; }.bind(this));
          other.removeClass('orange');
          other.addClass('light_blue');
          other.set('sort', null);
          other.getFirst().setStyle('opacity', 0);
          this.getFirst().setStyle('opacity', 1);
          this.set('sort', 'desc');
        }
        var sort = this.get('sort');
        if (sort == 'asc') {
          this.getFirst().removeClass('down');
          this.getFirst().addClass('up');
          this.set('sort', 'desc');
        } else if (sort == 'desc') {
          this.getFirst().removeClass('up');
          this.getFirst().addClass('down');
          this.set('sort', 'asc');
        }
        indicator.fadeIn();
        table_links.hide();
        new Request.JSON({
          url: options.index_resource,
          onComplete: function(json){
            $extend(options, json);
            rows.destroy();
            me.reloadRows();
            rows.zebra('zebra', options.columns.length);
            rows.zebra('zebra_orange', options.columns.length, options.columns.indexOf(this.textContent));
            indicator.hide();
            table_links.fadeIn();
          }.bind(this)
        }).get({ order: options.sortable[this.textContent] + ' ' + this.get('sort') });
      });
    };
  }
});