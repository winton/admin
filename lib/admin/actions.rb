module Admin
  module Actions
  
    def self.included(base)
      base.extend ClassMethods
    end

    module ClassMethods
      def acts_as_admin(*actions)
        self.class_eval do
          cattr_accessor :admin_sections
					helper_method  :admin_sections
					self.admin_sections = actions
					
          actions.each do |action|
            define_method action do
              @title ||= [ 'Admin' ]
              @title << action.to_s.capitalize.gsub('_', '')
              render :layout => false
            end
          end
        end
        include Admin::Actions::InstanceMethods
      end
    end

    module InstanceMethods
      def index
        @title ||= [ 'Admin' ]
        render :layout => 'admin/system/layout'
      end
    end
  end
end