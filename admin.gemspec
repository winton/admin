Gem::Specification.new do |s|
  s.name    = 'admin'
  s.version = '1.0.2'
  s.date    = '2008-08-16'
  
  s.summary     = "An instant Admin for your Rails app"
  s.description = "An instant Admin for your Rails app"
  
  s.author   = 'Winton Welsh'
  s.email    = 'mail@wintoni.us'
  s.homepage = 'http://github.com/winton/admin'
  
  s.has_rdoc = false
  
  s.files = Dir[*%w(
    init.rb
    lib/*
    lib/**/*
    MIT-LICENSE
    README.markdown
    resources/**/*
    tasks/*
  )]
end
