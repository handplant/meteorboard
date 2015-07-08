Template.commentItem.helpers({
    liked: function() {
        if(!Meteor.userId()) return false;
        if(_.include(this.likers, Meteor.userId()))
            return "btn-success";

    }
});

Template.commentItem.events({
    'click .like-comment': function(e) {
        e.preventDefault();
        Meteor.call('likeComment', this._id, function (error, result) {
            if (error)
                return sAlert.error(error.reason);
        });
    }
});