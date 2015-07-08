var commentsSubs = new SubsManager({
    cacheLimit: 20,
    expireIn: 5
});

Template.post.onCreated(function () {
    var self = this;

    self.sort = new ReactiveVar({createdAt: -1});
    self.limit = new ReactiveVar(5);

    self.autorun(function () {
        Meteor.subscribe("comments", self.data._id, self.limit.get());
    });

    self.comments = function () {
        return Comments.find({postId: self.data._id}, {sort: self.sort.get(), limit: self.limit.get()});
    }
});

Template.post.helpers({
    comments: function () {
        return Template.instance().comments();
    },
    hasMoreComments: function () {
        var hasMore = Template.instance().comments().fetch().length === Template.instance().limit.get();
        return hasMore ? hasMore : null;
    }
});

Template.post.events({
    'click .get-more-comments': function (e) {
        e.preventDefault();
        var limit = Template.instance().limit.get();
        limit += 5;
        Template.instance().limit.set(limit);
    }
});