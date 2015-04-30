Meteor.startup(function () {
    if (State.find().count() === 0) {
        State.insert({name: "Alaska"});
    }
    if (Sector.find().count() === 0) {
        Sector.insert({name: "Technology"});
    }
    if (Population.find().count() === 0) {
        Population.insert({name: "50,001-100,000"});
    }
});