Admin
=====

A quick way to implement a nice looking Admin in Rails.

Admin requires the following plugins:

* [haml](http://github.com/nex3/haml)
* [rails_widget](https://github.com/winton/rails_widget)
* [will_paginate](https://github.com/mislav/will_paginate)


Install
-------

	git submodule add git@github.com:winton/admin.git vendor/plugins/admin
	script/generate controller Admin
	rake admin
	rake widgets:install widgets=dialog,indicator,form,table

### Create title png
	
Open **public/images/admin/system/title.psd**, edit, and save to **public/images/admin/title.png**.


About the Install
-----------------

The `rake admin` task copies assets to

* app/views/admin/system
* app/widgets/admin
* public/images/admin/system
* public/javascripts/admin/system
* public/stylesheets/admin/system

The `rake widgets:install` task copies widgets into **app/widgets/vendor**. See [rails_widget](https://github.com/winton/rails_widget) for more information.


Routes
------

	ActionController::Routing::Routes.draw do |map|
	  Admin::routes
	end

(Add `Admin::routes` to **config/routes.rb**.)


Controller
----------

	class AdminController < ApplicationController
	  acts_as_admin :articles, :comments, :users
		
	  def articles
	  end
		
	  def comments
	  end
		
	  def users
	  end
	end

Add views to **views/admin**. Admin will take care of the layout, navigation, and rendering of your actions.

Your admin is located at **http://localhost/admin**.


Views
-----

You weren't expecting to code your own data tables and forms, were you?

Most of our views render one or more paginated data tables:

	<%= render_widget(:admin, :widgets, :table,
	  :id => 'some_resource_table',
	  :title => 'Some resource',
	  :index_url => '/some_resource.json',
	  :table_links => [
	    { :title => 'New', :url => '/some_resource/new', :implementation => 'admin/widgets/form' }
	  ],
	  :row_links => [
	    { :title => 'Edit',   :url => '/some_resource/:id/edit', :implementation => 'admin/widgets/form' },
	    { :title => 'Delete', :url => '/some_resource/:id.json' }
	  ],
	  :include_js => true
	) %>

See [table_widget](https://github.com/winton/table_widget) for more information.


Resources
---------

The data table in the Admin view connects to a [resource](http://api.rubyonrails.org/classes/ActionController/Resources.html).

### Index

#### Action

	def index
	  @some_resources = SomeResource.paginate :page => params[:page], :per_page => params[:per_page], :order => params[:order]
	  respond_to :json
	end

#### View (index.json.erb)

	<%= {
	  :order      => params[:order],
	  :page       => params[:page],
	  :category   => params[:category],
	  :columns    => [ 'ID', 'Header', 'Created at' ],
	  :sortable   => { 'ID' => :id, 'Header' => :header, 'Created at' => :created_at },
	  :widths     => [ 10, 60, 30 ],
	  :data       => @news_items.collect { |r| [ r.id, r.header, r.created_at ] }.flatten,
	  :ids        => @news_items.collect { |r| r.id }.flatten,
	  :pagination => will_paginate(@news_items)
	}.to_json %>

### New

#### Action

	def new
	  @some_resource = SomeResource.new
	end

#### View (new.haml)

	%fieldset
	  %legend
	    = (params[:action] == 'edit' ? 'update' : params[:action]).capitalize
	    some resource

	  - form_for @some_resource, :html => { :id => 'form' } do |f|
	    .field
	      = f.error_message_on :title
	      .name Title
	      = f.text_field :title

	    .field.clear
	      = f.error_message_on :body
	      .name Body
	      = f.text_area :body

	    .submit
	      = submit_tag 'Submit'

	    = hidden_field_tag :implementation, params[:implementation]

	= render_widget **[ params[:implementation].split('/'), { :include_js => true } ].flatten.compact


### Edit

#### Action

	def edit
	  @some_resource = SomeResource.find params[:id]
	  render :action => 'new', :layout => false
	end

### Destroy

#### Action

	def destroy
	  @some_resource = SomeResource.find params[:id]
	  @some_resource.destroy
	  render :nothing => true
	end

##### Copyright (c) 2008 Winton Welsh, released under the MIT license