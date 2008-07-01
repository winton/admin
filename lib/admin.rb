Dir[File.expand_path('*/*.rb', File.dirname(__FILE__))].each do |f|
  require [ File.dirname(f), File.basename(f, '.rb') ].join('/')
end

module Admin
  class << self
    def routes
      ActionController::Routing::Routes.add_route '/admin/:action/:id', :controller => 'admin'
    end
  end
end