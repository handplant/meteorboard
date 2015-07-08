Template.create.events({
    'click .create-post': function(event, tpl) {
        event.preventDefault();

        var post = {
            title: tpl.find('#title').value,
            body: tpl.find('#body').value
        }

        Meteor.call('postCreate', post, function(error, post) {
            if (error)
                return sAlert.error(error.reason);

            Router.go('post', {_id: post._id});
        });

    }
});