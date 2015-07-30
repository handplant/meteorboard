
var postSubsCache = new SubsManager({
    cacheLimit: 20,
    expireIn: 5
});

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    trackPageView: true
});

ListController = RouteController.extend({
    template: 'list',
    increment: 5,
    limit: function() {
        return parseInt(this.params.limit) || this.increment;
    },
    findOptions: function() {
        return {sort: this.sort, limit: this.limit()};
    },
    subscriptions: function() {
        this.postsSub = postSubsCache.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var self = this;
        return {
            posts: self.posts(),
            ready: self.postsSub.ready,
            nextPath: function() {
                if (self.posts().count() === self.limit())
                    return self.nextPath();
            }
        };
    }
});

NewListController = ListController.extend({
    sort: {createdAt: -1, _id: -1},
    nextPath: function() {
        return Router.routes.NewList.path({limit: this.limit() + this.increment})
    }
});

LikedListController = ListController.extend({
    sort: {likeCount: -1, createdAt: -1},
    nextPath: function() {
        return Router.routes.LikedList.path({limit: this.limit() + this.increment})
    }
});

CommentedListController = ListController.extend({
    sort: {commentCount: -1, createdAt: -1},
    nextPath: function() {
        return Router.routes.CommentedList.path({limit: this.limit() + this.increment})
    }
});

Router.route('/', {
    name: 'list',
    controller: NewListController
});
Router.route('/latest/:limit?', {name: 'NewList'});
Router.route('/commented/:limit?', {name: 'CommentedList'});
Router.route('/liked/:limit?', {name: 'LikedList'});

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