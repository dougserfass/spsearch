"use strict"

Meteor.startup(function () {
  Meteor.methods({
    updateState: function (targetUserId, state) {
      check(targetUserId, String);
      check(state, [String]);

        var search = "'strategic+plan' + filetype:pdf";
        var i;

        for (i = 0; i < state.length; i++) {
            search = search + " + '" + state[i] + "'";
        }

        var sector = Meteor.users.findOne({_id:targetUserId}).sector;
        for (i = 0; i < sector.length; i++) {
            search = search + " + '" + sector[i] + "'";
        }

        var population = Meteor.users.findOne({_id:targetUserId}).population;
        for (i = 0; i < population.length; i++) {
            search = search + " + '" + population[i] + "'";
        }

      Meteor.users.update({_id:targetUserId}, {
        $set: {
          state: state,
          search: search
        }
      })
    },
      updateSector: function (targetUserId, sector) {
          check(targetUserId, String);
          check(sector, [String]);

          var search = "'strategic+plan' + filetype:pdf";
          var i;

          for (i = 0; i < sector.length; i++) {
              search = search + " + '" + sector[i] + "'";
          }

          var state = Meteor.users.findOne({_id:targetUserId}).state;
          for (i = 0; i < state.length; i++) {
              search = search + " + '" + state[i] + "'";
          }

          var population = Meteor.users.findOne({_id:targetUserId}).population;
          for (i = 0; i < population.length; i++) {
              search = search + " + '" + population[i] + "'";
          }

          Meteor.users.update({_id:targetUserId}, {
              $set: {
                  sector: sector,
                  search: search
              }
          })
      },
      updatePopulation: function (targetUserId, population) {
          check(targetUserId, String);
          check(population, [String]);

          var search = "'strategic+plan' + filetype:pdf";
          var i;

          for (i = 0; i < population.length; i++) {
              search = search + " + '" + population[i] + "'";
          }

          var state = Meteor.users.findOne({_id:targetUserId}).state;
          for (i = 0; i < state.length; i++) {
              search = search + " + '" + state[i] + "'";
          }

          var sector = Meteor.users.findOne({_id:targetUserId}).sector;
          for (i = 0; i < sector.length; i++) {
              search = search + " + '" + sector[i] + "'";
          }

          Meteor.users.update({_id:targetUserId}, {
              $set: {
                  population: population,
                  search: search
              }
          })
      }
  })
})







