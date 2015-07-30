Meteor.publish('posts', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    })
    //Meteor._sleepForMs(3000);
    return Posts.find({}, options);
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

Meteor.publish("allUsernames", function () {
    return Meteor.users.find({}, {fields: {
        "username": 1
    }});
});