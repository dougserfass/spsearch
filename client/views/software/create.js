Template.createSoftware.events({
  'submit form': function(e) {
    e.preventDefault();
    var software = {
      name: $(e.target).find('[name=name]').val()
    }
    Software.insert(software);
    Router.go('vm');
  }
});