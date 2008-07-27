var Global = Global || {};
Global.AdminTable = new AdminTable({
  title:          <%= title.to_json %>,
  id:             <%= id.to_json %>,
  index_resource: <%= index_resource.to_json %>,
  table_links:    <%= table_links.to_json %>,
  row_links:      <%= row_links.to_json %>
});