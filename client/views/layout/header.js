Template.header.helpers({
    isActive: function (name) {
        return (Router.current().route.getName() === name) ? 'active' : '';
    }
});