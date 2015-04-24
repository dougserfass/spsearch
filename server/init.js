Meteor.startup(function () {
  if (Software.find().count() === 0) {
    Software.insert({name: "Alaska"});
  }
});