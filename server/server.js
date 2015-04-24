"use strict"

Meteor.startup(function () {
  Meteor.methods({
    updateSoftware: function (targetUserId, software) {
      check(targetUserId, String)
      check(software, [String])

      Meteor.users.update({_id:targetUserId}, {
        $set: {
          software: software
        }
      })
    }
  })
})







