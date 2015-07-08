Meteor.startup(function () {
    //Posts.remove({});
    if (Posts.find().count() === 0) {
        for (i = 0; i <= 2500; i++) {
            Posts.insert({
                title: Fake.sentence(6),
                intro: Fake.paragraph(3),
                body: Fake.paragraph(12),
                userId: 0,
                createdAt: Date.now()
            });
        }
    }
});