"use strict"

Meteor.startup(function () {
  Meteor.subscribe('users')
  Meteor.subscribe('software')
    Meteor.subscribe('user')
})

Template.vm.events({
  'click .name a': manageSoftwareClicked,
  'click .software': manageSoftwareClicked
})

Template.vm.helpers({
  software: function () {
    return this.software
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

function manageSoftwareClicked (evt) {
  var $person,
    userId

  evt.preventDefault()

  $person = $(evt.target).closest('.person')
  userId = $person.attr('data-id')

  Session.set('selectedUserId', userId)

  $('#user-software').modal()

}

var logRender = function () {
  var userId = Session.get('selectedUserId'),
    user,
    $options

  if (!userId) return

  user = Meteor.users.findOne({_id: userId})

  if (!user) return

  $options = $('option', '#software')

  $options.each(function (index, option) {
    var $option = $(option),
      val = $option.val(),
      hasSoftware

    hasSoftware = _.contains(user.software, val)

    if (hasSoftware) {
      $option.attr('selected', true)
    } else {
      $option.removeAttr('selected')
    }
  })

  renderMultiSelect()
};

Template.editVmForm.rendered = function () {
  logRender();
}

function renderMultiSelect () {
  var $software,
    data,
    dataExists

  if (!jQuery.fn.multiSelect) return

  $software = $('#software')
  data = $software.data('multiselect')
  dataExists = data ? true : false

  if (dataExists) {
    $software.data('multiselect', null)
  }

  $software.multiSelect({
    selectableHeader: "Available",
    selectionHeader: "Used"
  })
}

Template.editVmForm.events({

  'click #cancelChanges': function (evt) {

    evt.preventDefault()

    location.reload()

  },

  'click #saveChanges': function (evt) {
    var $form = $('#manage-software-form'),
      data,
      software

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

    software = data.software || []
    if (!_.isArray(software)) {
      // ensure software is an array
      software = [software]
    }

    Meteor.call('updateSoftware',
      data._id,
      software,
      function (error, result) {
        if (error) {
          alert(error)
        } else {
          bootbox.alert('Software updated', function () {
            $('#user-software').modal('hide')
          })
        }
      })

    location.reload()

  }
})

Template.editVmForm.helpers({
  user: function () {

    Meteor.defer(function() {
      logRender();
    });

    var userId = Session.get('selectedUserId'),
      user = Meteor.users.findOne({_id: userId})

    return user
  },

  allSoftware: function () {

    var fruits = [];

    var software = Software.find({}, {sort: {name: 1}});

    software.forEach(function (software) {
        fruits[fruits.length] = software.name;
    });
    return fruits;
  }
})