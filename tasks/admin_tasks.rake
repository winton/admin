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
    
  def copy_resource(type, location)
    location += '/admin/system'
    if File.file? location
      puts "=> Removing old #{type}..."
      system "rm -Rf #{location}"
    end
    puts "=> Copying #{type}..."
    system "mkdir -p #{location}"
    system "cp #{File.dirname(__FILE__)}/../resources/#{type} #{location}"
  end
end
