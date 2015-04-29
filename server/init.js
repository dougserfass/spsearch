Meteor.startup(function () {
  if (State.find().count() === 0) {
    State.insert({name: "Alaska"});
  }
});