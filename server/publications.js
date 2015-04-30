Meteor.publish('state', function() {
  return State.find();
});
Meteor.publish("user", function () {
    return Meteor.users.find({_id: this.userId});
});
Meteor.publish('sector', function() {
    return Sector.find();
});
Meteor.publish('population', function() {
    return Population.find();
});