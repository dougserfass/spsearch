"use strict"

Meteor.startup(function () {
  Meteor.subscribe('users')
  Meteor.subscribe('state')
    Meteor.subscribe('user')
})

Template.search.events({
  'click .name a': manageStateClicked,
  'click .state': manageStateClicked
})

Template.search.helpers({

    guest: function () {
        if(Meteor.user().profile.guest) {
            return Meteor.user();
        }
        return null;


        //return Meteor.user().profile.guest;
    },


    state: function () {
    return this.state
  },
  users: function () {
    return Meteor.users.find()
  },
  mobile: function () {
    var profile = this.profile,
      mobile = ''

    if (profile)
      mobile = profile.mobile

    if ("null" === mobile || !mobile)
      mobile = ''

    return mobile
  },
  emailAddress: function () {
    var emails = this.emails

    if (emails && emails.length > 0) {
      return emails[0].address
    }

    return ""
  }
})

function manageStateClicked (evt) {
  var $person,
    userId

  evt.preventDefault()

  $person = $(evt.target).closest('.person')
  userId = $person.attr('data-id')

  Session.set('selectedUserId', userId)

  $('#user-state').modal()

}

var logRender = function () {
  var userId = Session.get('selectedUserId'),
    user,
    $options

  if (!userId) return

  user = Meteor.users.findOne({_id: userId})

  if (!user) return

  $options = $('option', '#state')

  $options.each(function (index, option) {
    var $option = $(option),
      val = $option.val(),
      hasState

    hasState = _.contains(user.state, val)

    if (hasState) {
      $option.attr('selected', true)
    } else {
      $option.removeAttr('selected')
    }
  })

  renderMultiSelect()
};

Template.editSearchForm.rendered = function () {
  logRender();
}

function renderMultiSelect () {
  var $state,
    data,
    dataExists

  if (!jQuery.fn.multiSelect) return

  $state = $('#state')
  data = $state.data('multiselect')
  dataExists = data ? true : false

  if (dataExists) {
    $state.data('multiselect', null)
  }

  $state.multiSelect({
    selectableHeader: "Not Selected",
    selectionHeader: "Selected"
  })
}

Template.editSearchForm.events({

  'click #cancelChanges': function (evt) {

    evt.preventDefault()

    location.reload()

  },

  'click #saveChanges': function (evt) {
    var $form = $('#manage-state-form'),
      data,
      state

    evt.preventDefault()

    var o = {},
      a = $form.serializeArray();

    $.each(a, function() {
      var name = this.name
      if (o[name] !== undefined) {
        if (!o[name].push) {
          o[name] = [o[name]];
        }
        o[name].push(this.value || '');
      } else {
        o[name] = this.value || '';
      }
    });

    data = o;

    state = data.state || []
    if (!_.isArray(state)) {
      // ensure state is an array
      state = [state]
    }

    Meteor.call('updateState',
      data._id,
      state,
      function (error, result) {
        if (error) {
          alert(error)
        } else {
          bootbox.alert('State updated', function () {
            $('#user-state').modal('hide')
          })
        }
      })

    location.reload()

  }
})

Template.editSearchForm.helpers({
  user: function () {

    Meteor.defer(function() {
      logRender();
    });

    var userId = Session.get('selectedUserId'),
      user = Meteor.users.findOne({_id: userId})

    return user
  },

  allState: function () {

    var fruits = [];

    var states = State.find({}, {sort: {name: 1}});

    states.forEach(function (state) {
        fruits[fruits.length] = state.name;
    });
    return fruits;
  }
})