Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    trackPageView: true
});

Router.route('/', {
    name: 'latest',
    template: 'list',
    onBeforeAction: function () {
        Session.set('sort', {createdAt: -1, _id: 1});
        this.next();
    },
    fastRender: true
});

Router.route('/most-liked', {
    name: 'mostliked',
    template: 'list',
    onBeforeAction: function () {
        Session.set('sort', {likeCount: -1, createdAt: -1});
        this.next();
    },
    fastRender: true
});

Router.route('/most-commented', {
    name: 'mostcommented',
    template: 'list',
    onBeforeAction: function () {
        Session.set('sort', {commentCount: -1, createdAt: -1});
        this.next();
    },
    fastRender: true
});

Router.route('/search', {
    name: 'search',
    template: 'search',
    fastRender: true
});

Router.route('/post/:_id', {
    name: 'post',
    waitOn: function () {
        return Meteor.subscribe('currentPost', this.params._id)
    },
    data: function () {
        return Posts.findOne({ _id: this.params._id });
    },
    fastRender: true
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