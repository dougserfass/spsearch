Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);
//Houston.add_collection(Meteor.roles);
Houston.add_collection(State);
Houston.add_collection(Sector);
Houston.add_collection(Population);

Meteor.methods({
    currentUserIsAdmin: function (result) {
        var admin = Houston._user_is_admin(this.userId);
        if (!admin) {
            return false;
        } else {
            return true;
        }
    }
})