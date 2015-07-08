Template.registerHelper("usernameFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    return user.username;
});

Template.registerHelper("convertText", function (text) {
    if (text) {
        var newText = text.replace(/#(\w+)/g, "<a href='/search/?q=$1'>$&</a>");
        var nl2br = (newText + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Spacebars.SafeString(nl2br);
    }
    return false;
});

Template.registerHelper('nl2br', function(text) {
    var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    return new Spacebars.SafeString(nl2br);
});

Template.registerHelper("timeAgo", function (timestamp) {
    return moment(timestamp).fromNow();
});