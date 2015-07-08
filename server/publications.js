Meteor.publish('posts', function(limit) {
    check(limit, Number);
    return Posts.find({}, {sort: {createdAt: -1, _id: 1}, limit: limit});
});

Meteor.publish('currentPost', function(id) {
    check(id, String);
    return id && Posts.find(id);
});

Meteor.publish('comments', function(postId, limit) {
    check(postId, String);
    check(limit, Number);
    return Comments.find({postId: postId}, {sort: {createdAt: -1, _id: 1}, limit: limit});
});