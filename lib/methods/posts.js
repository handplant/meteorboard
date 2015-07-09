Meteor.methods({
    postCreate: function(post) {
        //check arguments
        check(this.userId, String);
        check(post, {
            title: String,
            body: String
        });

        //extend post
        post.createdAt = Date.now();
        post.userId = this.userId;
        post.likeCount = 0;
        post.likers = [];
        post.commentCount = 0;
        post.commenters = [];

        //validate against schema
        check(post, postSchema);

        //create
        post._id = Posts.insert(post);
        return post;
    },

    likePost: function(postId) {
        check(postId, String);

        if (!this.userId) {
            throw new Meteor.Error('invalid', "Access denied! Please log in.");
            return false;
        }

        var post = Posts.findOne({ _id: postId });

        if (post) {
            var userHasLiked = post.likers && post.likers.indexOf(this.userId) != -1;
            if (userHasLiked) {
                Posts.update({_id: post && post._id}, {
                    $pull: {likers: this.userId},
                    $inc: {likeCount: -1}
                });
            } else {
                Posts.update({_id: post && post._id}, {
                    $addToSet: {likers: this.userId},
                    $inc: {likeCount: 1}
                });
            }
        }

    }
});