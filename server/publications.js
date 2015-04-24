Meteor.publish('software', function() {
  return Software.find();
});
Meteor.publish("user", function () {
    return Meteor.users.find({_id: this.userId});
});