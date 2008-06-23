desc 'Updates admin/system for all resources'
task :admin => [ 'admin:images', 'admin:javascripts', 'admin:stylesheets', 'admin:views' ]

namespace :admin do
  desc 'Updates images/admin/system'
  task :images do
    copy_resource :images, 'public/images'
  end
  
  desc 'Updates javascripts/admin/system'
  task :javascripts do
    copy_resource :javascripts, 'public/javascripts'
  end
  
  desc 'Updates stylesheets/admin/system'
  task :stylesheets do
    copy_resource :stylesheets, 'public/stylesheets'
  end
  
  desc 'Updates views/admin/system'
  task :views do
    copy_resource :views, 'app/views'
  end
  
  desc 'Updates plugin resources from app'
  task :to_plugin do
    copy_resource :images,      'public/images',      true
    copy_resource :javascripts, 'public/javascripts', true
    copy_resource :stylesheets, 'public/stylesheets', true
    copy_resource :views,       'app/views',          true
  end
    
  def copy_resource(type, location, reverse=false)
    from = "#{File.dirname(__FILE__)}/../resources/#{type}"
    to   = location + '/admin/system'
    if reverse
      x = from
      from = to
      to = x
    end
    if File.file? location
      puts "=> Removing old #{type}..."
      system "rm -Rf #{to}"
    end
    puts "=> Copying #{type}..."
    system "mkdir -p #{to}"
    system "cp #{from} #{to}"
  end
end
