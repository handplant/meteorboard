Template.item.helpers({
    liked: function() {
        if(!Meteor.userId()) return false;
        if(_.include(this.likers, Meteor.userId()))
            return "btn-success";

    }
});

Template.item.events({
    'click .go-to-post': function(e) {
        e.preventDefault();
        Router.go('/post/'+this._id);
    },
    'click .like-post': function(e) {
        e.preventDefault();
        Meteor.call('likePost', this._id, function (error, result) {
            if (error)
                return sAlert.error(error.reason);
        });
    }
});