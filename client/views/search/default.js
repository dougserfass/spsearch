"use strict"

Meteor.startup(function () {
    Meteor.subscribe('state')
    Meteor.subscribe('sector')
    Meteor.subscribe('population')
    Meteor.subscribe('user')
})

Template.search.events({
    'click .stateName a': manageStateClicked,
    'click .state': manageStateClicked,
    'click .sectorName a': manageSectorClicked,
    'click .sector': manageSectorClicked,
    'click .populationName a': managePopulationClicked,
    'click .population': managePopulationClicked
})

Template.search.helpers({
    guest: function () {
        if(Meteor.user().profile.guest) {
            return Meteor.user();
        }
        return null;
    },
    state: function () {
        return this.state
    },
    sector: function () {
        return this.sector
    },
    population: function () {
        return this.population
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

function manageSectorClicked (evt) {
    var $person,
        userId
    evt.preventDefault()
    $person = $(evt.target).closest('.person')
    userId = $person.attr('data-id')
    Session.set('selectedUserId', userId)
    $('#user-sector').modal()
}

function managePopulationClicked (evt) {
    var $person,
        userId
    evt.preventDefault()
    $person = $(evt.target).closest('.person')
    userId = $person.attr('data-id')
    Session.set('selectedUserId', userId)
    $('#user-population').modal()
}

var logRenderState = function () {
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
    renderMultiSelectState()
};

var logRenderSector = function () {
    var userId = Session.get('selectedUserId'),
        user,
        $options
    if (!userId) return
    user = Meteor.users.findOne({_id: userId})
    if (!user) return
    $options = $('option', '#sector')
    $options.each(function (index, option) {
        var $option = $(option),
            val = $option.val(),
            hasSector
        hasSector = _.contains(user.sector, val)
        if (hasSector) {
            $option.attr('selected', true)
        } else {
            $option.removeAttr('selected')
        }
    })
    renderMultiSelectSector()
};

var logRenderPopulation = function () {
    var userId = Session.get('selectedUserId'),
        user,
        $options
    if (!userId) return
    user = Meteor.users.findOne({_id: userId})
    if (!user) return
    $options = $('option', '#population')
    $options.each(function (index, option) {
        var $option = $(option),
            val = $option.val(),
            hasPopulation
        hasPopulation = _.contains(user.population, val)
        if (hasPopulation) {
            $option.attr('selected', true)
        } else {
            $option.removeAttr('selected')
        }
    })
    renderMultiSelectPopulation()
};

Template.stateForm.rendered = function () {
    logRenderState();
}

Template.sectorForm.rendered = function () {
    logRenderSector();
}

Template.populationForm.rendered = function () {
    logRenderPopulation();
}

function renderMultiSelectState () {
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
        selectableHeader: "not selected",
        selectionHeader: "selected"
    })
}

function renderMultiSelectSector () {
    var $sector,
        data,
        dataExists
    if (!jQuery.fn.multiSelect) return
    $sector = $('#sector')
    data = $sector.data('multiselect')
    dataExists = data ? true : false
    if (dataExists) {
        $sector.data('multiselect', null)
    }
    $sector.multiSelect({
        selectableHeader: "not selected",
        selectionHeader: "selected"
    })
}

function renderMultiSelectPopulation () {
    var $population,
        data,
        dataExists
    if (!jQuery.fn.multiSelect) return
    $population = $('#population')
    data = $population.data('multiselect')
    dataExists = data ? true : false
    if (dataExists) {
        $population.data('multiselect', null)
    }
    $population.multiSelect({
        selectableHeader: "not selected",
        selectionHeader: "selected"
    })
}

Template.stateForm.events({
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
            state = [state]
        }
        Meteor.call(
            'updateState',
            data._id,
            state,
            function (error, result) {
                if (error) {
                    alert(error)
                } else {
                    bootbox.alert(
                        'state updated',
                        function () {
                        $('#user-state').modal('hide')
                        }
                    )
                }
            }
        )
        location.reload()
    }
})

Template.sectorForm.events({
    'click #cancelChanges': function (evt) {
        evt.preventDefault()
        location.reload()
    },
    'click #saveChanges': function (evt) {
        var $form = $('#manage-sector-form'),
            data,
            sector
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
        sector = data.sector || []
        if (!_.isArray(sector)) {
            sector = [sector]
        }
        Meteor.call(
            'updateSector',
            data._id,
            sector,
            function (error, result) {
                if (error) {
                    alert(error)
                } else {
                    bootbox.alert(
                        'sector updated',
                        function () {
                            $('#user-sector').modal('hide')
                        }
                    )
                }
            }
        )
        location.reload()
    }
})

Template.populationForm.events({
    'click #cancelChanges': function (evt) {
        evt.preventDefault()
        location.reload()
    },
    'click #saveChanges': function (evt) {
        var $form = $('#manage-population-form'),
            data,
            population
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
        population = data.population || []
        if (!_.isArray(population)) {
            population = [population]
        }
        Meteor.call(
            'updatePopulation',
            data._id,
            population,
            function (error, result) {
                if (error) {
                    alert(error)
                } else {
                    bootbox.alert(
                        'population updated',
                        function () {
                            $('#user-population').modal('hide')
                        }
                    )
                }
            }
        )
        location.reload()
    }
})

Template.stateForm.helpers({
    user: function () {
        Meteor.defer(function() {
            logRenderState();
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

Template.sectorForm.helpers({
    user: function () {
        Meteor.defer(function() {
            logRenderSector();
        });
        var userId = Session.get('selectedUserId'),
            user = Meteor.users.findOne({_id: userId})
        return user
    },
    allSector: function () {
        var fruits = [];
        var sectors = Sector.find({}, {sort: {name: 1}});
        sectors.forEach(function (sector) {
            fruits[fruits.length] = sector.name;
        });
        return fruits;
    }
})

Template.populationForm.helpers({
    user: function () {
        Meteor.defer(function() {
            logRenderPopulation();
        });
        var userId = Session.get('selectedUserId'),
            user = Meteor.users.findOne({_id: userId})
        return user
    },
    allPopulation: function () {
        var fruits = [];
        var populations = Population.find({}, {sort: {name: 1}});
        populations.forEach(function (population) {
            fruits[fruits.length] = population.name;
        });
        return fruits;
    }
})

Template.googleSearchBox.helpers({
    search: function () {
        return Meteor.user().search
    }
})

Template.bingSearchBox.helpers({
    search: function () {
        return Meteor.user().search
    }
})

Template.yahooSearchBox.helpers({
    search: function () {
        return Meteor.user().search
    }
})