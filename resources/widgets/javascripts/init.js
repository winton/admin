var Global = Global || {};
Global.Admin = new Admin();
Global.authenticity_token = <%= form_authenticity_token.inspect %>;