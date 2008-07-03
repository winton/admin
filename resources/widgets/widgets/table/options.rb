{
  :title => 'Some resource',
    # Table's title
    
  :id => 'some_resource',
    # Table's DOM id
  
  :index_resource => '/some_resource.json',
    # Resource's index action
      # Parameters
        # order_by (same format as ActiveRecord parameter)
        # page (optional for pagination)
      # Returns JSON
        # {
        #   columns: [ 'Column 1', 'Column 2' ],
        #   widths:  [ 50, 50 ], // (%)
        #   data:    [ 'col 1 row 1', 'col 2 row 1', 'col 1 row 2' ... ],
        #   ids:     [ 1, 2, 3 ... ], // (one for each row)
        #   pagination: pagination link HTML (optional)
        # }
  
  :table_links => [
    { :title => 'New', :resource => '/some_resource/new' }
  ],
    # Links displayed in top right corner of table
      # :resource should return HTML or JSON depending on URL extension
        # HTML should be a form
        # JSON should be { message: '' } or true
  
  :row_links => [
    { :title => 'Edit',   :resource => '/some_resource/edit' },
    { :title => 'Delete', :resource => '/some_resource/destroy.json' }
  ]
    # Links displayed when row is clicked
      # :resource should return HTML or JSON depending on URL extension
        # HTML should be a form
        # JSON should be { message: '' } or true
}