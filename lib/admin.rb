Dir[File.expand_path('*/*.rb', File.dirname(__FILE__))].each do |f|
  require [ File.dirname(f), File.basename(f, '.rb') ].join('/')
end