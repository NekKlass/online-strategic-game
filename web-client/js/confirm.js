var confirm_dlg = {};

confirm_dlg.block = $('#modal-confirm');
confirm_dlg.btnYes = confirm_dlg.block.find('#confirm-yes');
confirm_dlg.btnNo = confirm_dlg.block.find('#confirm-no');

confirm_dlg.show = function( callbackYes, callbackNo ) {
    confirm_dlg.btnYes.attr( 'src', resources_address + 'icons/yes.png' );
    confirm_dlg.btnNo.attr( 'src', resources_address + 'icons/no.png' );
    confirm_dlg.callbackYes = callbackYes;
    confirm_dlg.callbackNo = callbackNo;
    confirm_dlg.block.parents('.modal-background').css( 'display', 'flex' );
    tab.settings.translate();
}

confirm_dlg.btnYes.click(function(event){
    confirm_dlg.callbackYes();
    confirm_dlg.close();
});

confirm_dlg.btnNo.click(function(event){
    confirm_dlg.callbackNo();
    confirm_dlg.close();
});

confirm_dlg.close = function () {
    confirm_dlg.block.parents('.modal-background').hide();
}

$('#modal-confirm-close').click(function(event){
    confirm_dlg.close();
});
