var postSubs = new SubsManager({
    cacheLimit: 20,
    expireIn: 5
});

var incrementPostsLimit = function () {
    newLimit = Session.get('limit') + 20;
    Session.set('limit', newLimit);
}

Template.list.onCreated(function () {
    var self = this;

    Session.set('limit', 20);

    Deps.autorun(function () {
        postSubs.subscribe('posts', Session.get('sort'), Session.get('limit'));
    });
});

Template.list.events({
    'click .get-more-posts': function (e) {
        e.preventDefault();
        incrementPostsLimit();
    }
});

Template.list.helpers({
    posts: function () {
        return Posts.find({}, {sort: Session.get('sort'), limit: Session.get('limit')});
    },
    hasMorePosts: function () {
        if (parseInt(Session.get('limit')) <= Posts.find().count())
            return true;

        return false;
    }
});