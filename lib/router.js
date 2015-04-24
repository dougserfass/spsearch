Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});
Router.map(function() {
    this.route('defaultLanding', {path: '/'});
    this.route('createSoftware');
    this.route('vm');
});
/*
var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('defaultLanding');
  } else {
    this.next();
  }
}
Router.onBeforeAction('loading');
*/
var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else
            this.render('defaultLanding');
    } else {
        this.next();
    }
}
Router.onBeforeAction('loading');
//Router.onBeforeAction(requireLogin, {only: 'taskSubmit'});
Router.onBeforeAction(requireLogin);