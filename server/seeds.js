Meteor.startup(function () {
    //Posts.remove({});
    if (Posts.find().count() === 0) {
        for (i = 0; i <= 250; i++) {
            Posts.insert({
                title: Fake.sentence(6),
                body: Fake.paragraph(12),
                likeCount: Fake.fromArray(['1', '4', '8', '15', '21']),
                commentCount: Fake.fromArray(['1', '6', '9', '17', '25']),
                userId: 0,
                createdAt: Date.now()
            });
        }
    }
});