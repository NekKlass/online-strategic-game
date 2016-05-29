var message = {};

message.content = $('#modal-message').find('#modal-content');

message.show = function ( messageToShow ) {
    message.content.html( messageToShow );
    message.content.parents('#modal-background').css( 'display', 'flex' );
    tab.settings.translate();
}
