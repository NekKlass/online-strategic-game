var confirm_dlg = {};

confirm_dlg.block = $('#modal-confirm');

confirm_dlg.show = function( callbackYes, callbackNo ) {
    confirm_dlg.callbackYes = callbackYes;
    confirm_dlg.callbackNo = callbackNo;
    tab.settings.translate();
    confirm_dlg.block.parents('.modal-background').css( 'display', 'flex' );
}

confirm_dlg.block.find('.confirm-btn').click(function(event) {
    if ( $( event.target).attr( 'value' ) == 'yes' ) {
        confirm_dlg.callbackYes();
    } else {
        confirm_dlg.callbackNo();
    }
    confirm_dlg.close();
});

confirm_dlg.close = function () {
    confirm_dlg.block.parents('.modal-background').hide();
}

$('#modal-confirm-close').click(function(event){
    confirm_dlg.close();
});
