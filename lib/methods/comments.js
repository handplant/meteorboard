Meteor.methods({
    commentCreate: function(comment) {

        if (!this.userId) {
            throw new Meteor.Error('invalid', "Access denied! Please log in.");
            return false;
        }

        //check arguments
        check(this.userId, String);
        console.log(comment);
        check(comment, {
            postId: String,
            body: String
        });

        //check if post exists
        var post = Posts.findOne(comment.postId);
        if (!post)
            throw new Meteor.Error('invalid', 'You must comment on a existing post!');

        //extend comment
        comment.createdAt = Date.now();
        comment.userId = this.userId;
        comment.likeCount = 0;
        comment.likers = [];

        //validate against schema
        check(comment, commentSchema);

        //create
        comment._id = Comments.insert(comment);

        // increment comment count
        Meteor.users.update({_id: this.userId}, {
            $inc: {'commentCount': 1}
        });
        Posts.update(comment.postId, {
            $inc:       {commentCount: 1},
            $addToSet:  {commenters: this.userId}
        });

        return comment;
    },
    likeComment: function (commentId) {

        check(commentId, String);

        if (!this.userId) {
            throw new Meteor.Error('invalid', "Access denied! Please log in.");
            return false;
        }

        var comment = Comments.findOne({ _id: commentId });

        if (comment) {
            var userHasLiked = comment.likers && comment.likers.indexOf(this.userId) != -1;
            if (userHasLiked) {
                Comments.update({_id: comment && comment._id}, {
                    $pull: {likers: this.userId},
                    $inc: {likeCount: -1}
                });
            } else {
                Comments.update({_id: comment && comment._id}, {
                    $addToSet: {likers: this.userId},
                    $inc: {likeCount: 1}
                });
            }
        }
    }
});