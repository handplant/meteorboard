Meteor.subscribe('allUsernames');

Meteor.startup(function () {

    sAlert.config({
        effect: 'jelly',
        position: 'bottom',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: false,
        offset: 0
    });

});