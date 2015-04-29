"use strict"

Meteor.startup(function () {
  Meteor.methods({
    updateState: function (targetUserId, state) {
      check(targetUserId, String)
      check(state, [String])

      Meteor.users.update({_id:targetUserId}, {
        $set: {
          state: state
        }
      })
    }
  })
})







