var confirm_dlg = {};

localization['client-confirm'] = {
    'ru': 'Подтверждение',
    'en': 'Confirmation'
}
localization['client-confirm-sure'] = {
    'ru': 'Вы уверены?',
    'en': 'Are you sure?'
}
localization['client-confirm-yes'] = {
    'ru': 'да',
    'en': 'yes'
}
localization['client-confirm-no'] = {
    'ru': 'нет',
    'en': 'no'
}

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
