Template.defaultHeader.helpers({
    currentUserIsAdmin: function () {
        Meteor.call('currentUserIsAdmin', function(error, result) {
            Session.set('currentUserIsAdminResult', result);
        });
        return Session.get('currentUserIsAdminResult');
    }
})