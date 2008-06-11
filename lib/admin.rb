Dir[File.expand_path('*/*.rb', File.dirname(__FILE__))].each do |f|
  f = f.split('/')
  require File.join(File.dirname(__FILE__), [ f[-2], File.basename(f[-1], '.rb') ].join('/'))
end