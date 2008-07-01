{
  :title => 'Some resource',
    # Table's title
  
  :index_resource => '/some_resource.json',
    # Resource's index action
      # Parameters
        # order_by (same format as ActiveRecord parameter)
        # page (optional for pagination)
      # Returns JSON
        # {
        #   pages: [ { column1: '', column2: '' }, ... ],
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
  ],
    # Links displayed when row is clicked
      # :resource should return HTML or JSON depending on URL extension
        # HTML should be a form
        # JSON should be { message: '' } or true
}