Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'list'
});

Router.route('/post/:_id', {
    name: 'post',
    waitOn: function () {
        return Meteor.subscribe('currentPost', this.params._id)
    },
    data: function () {
        return Posts.findOne({ _id: this.params._id });
    }
});

Router.route('/create', {
    name: 'create'
});

var requireLogin = function() {
    if (! Meteor.user()) {
        sAlert.error('Access denied! Please log in.');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {only: 'create'});