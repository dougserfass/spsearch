Template.createState.events({
  'submit form': function(e) {
    e.preventDefault();
    var state = {
      name: $(e.target).find('[name=name]').val()
    }
    State.insert(state);
    Router.go('search');
  }
});