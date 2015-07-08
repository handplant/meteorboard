commentSchemaObject = {
    _id: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Number
    },
    postId: {
        type: String
    },
    userId: {
        type: String,
        optional: true
    },
    body: {
        type: String,
        label: "Comment",
        min: 3,
        max: 400
    },
    likeCount: {
        type: Number,
        optional: true
    },
    likers: {
        type: [String],
        optional: true
    }
};

Comments = new Meteor.Collection('comments');

commentSchema = new SimpleSchema(commentSchemaObject);
Comments.attachSchema(commentSchema);