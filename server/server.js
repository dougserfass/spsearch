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
    },
      updateSector: function (targetUserId, sector) {
          check(targetUserId, String)
          check(sector, [String])

          Meteor.users.update({_id:targetUserId}, {
              $set: {
                  sector: sector
              }
          })
      },
      updatePopulation: function (targetUserId, population) {
          check(targetUserId, String)
          check(population, [String])

          Meteor.users.update({_id:targetUserId}, {
              $set: {
                  population: population
              }
          })
      }
  })
})







