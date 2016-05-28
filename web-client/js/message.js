var message = {};

message.content = $('#modal-message').find('#modal-content');

message.show = function ( message ) {
    message.content.html( message );
    message.content.parents('#modal-background').css( 'display', 'flex' );
}
