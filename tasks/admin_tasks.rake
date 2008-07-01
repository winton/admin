desc 'Updates admin/system for all resources'
task :admin => [ 'admin:images', 'admin:javascripts', 'admin:stylesheets', 'admin:views', 'admin:widgets' ]

namespace :admin do
  desc 'Updates images/admin/system'
  task :images do
    admin_resource :images, 'public/images'
  end
  
  desc 'Updates javascripts/admin/system'
  task :javascripts do
    admin_resource :javascripts, 'public/javascripts'
  end
  
  desc 'Updates stylesheets/admin/system'
  task :stylesheets do
    admin_resource :stylesheets, 'public/stylesheets/sass'
  end
  
  desc 'Updates views/admin/system'
  task :views do
    admin_resource :views, 'app/views'
  end
  
  desc 'Updates widgets/admin'
  task :widgets do
    admin_resource :views, 'app/views'
  end
  
  desc 'Updates plugin resources from app'
  task :to_plugin do
    admin_resource :images,      'public/images',           true
    admin_resource :javascripts, 'public/javascripts',      true
    admin_resource :stylesheets, 'public/stylesheets/sass', true
    admin_resource :views,       'app/views',               true
    admin_resource :widgets,     'app/widgets',             true
  end
    
  def admin_resource(type, location, reverse=false)
    from = "#{File.dirname(__FILE__)}/../resources/#{type}"
    to   = location + (type == :widgets ? '/admin' : '/admin/system')
    from, to = to, from if reverse
    puts "=> Removing old #{type}..."
    FileUtils.remove_dir to, true
    FileUtils.mkdir_p to
    puts "=> Copying #{type}..."
    Dir["#{from}/*"].each do |f|
      if File.directory? f
        FileUtils.mkdir_p "#{to}/#{File.basename(f)}"
        FileUtils.cp_r f, to
      else
        FileUtils.cp f, to
      end
    end
  end
end
