Template.commentCreate.events({
    'click .create-comment': function (event, tpl) {
        event.preventDefault();

        var body = tpl.find('#comment').value;
        var comment = {
            body: body,
            postId: tpl.data._id
        };

        Meteor.call('commentCreate', comment, function (error, comment) {
            if (error) {
                return sAlert.error(error.reason);
            } else {
                $('#comment').val('');
            }
        });
    }
});