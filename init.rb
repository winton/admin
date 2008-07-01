require 'admin'

ActionView::Base.send :include, Admin::Helpers
ActionController::Base.send :include, Admin::Actions