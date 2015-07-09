postSchemaObject = {
    _id: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Number,
        optional: true
    },
    title: {
        type: String,
        label: "Title",
        optional: false,
        min: 3,
        max: 99
    },
    body: {
        type: String,
        label: "Text",
        optional: false
    },
    userId: {
        type: String,
        optional: true
    },
    likeCount: {
        type: Number,
        optional: true
    },
    likers: {
        type: [String],
        optional: true
    },
    commentCount: {
        type: Number,
        optional: true
    },
    commenters: {
        type: [String],
        optional: true
    },
    tags: {
        type: [String],
        optional: true
    }
};

Posts = new Meteor.Collection('posts');

postSchema = new SimpleSchema(postSchemaObject);
Posts.attachSchema(postSchema);

Posts.initEasySearch(['title', 'body']);
