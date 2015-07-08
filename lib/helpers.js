convertBody = function(text) {
    var newBody = text.replace(/#(\w+)/g, "<a href='/search/?q=$1'>$&</a>");
    var body = newline2br(newBody);
    return body;
}