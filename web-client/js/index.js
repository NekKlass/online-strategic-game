var api_address = 'http://localhost/online-strategic-game-api/';
var login_modal = $('#login-modal');
var register_modal = $('#register-modal');
var exit_confitm = $('#exit-confirm');
var modal_background = $('#modal-background');

//hide 'login', 'exit', 'register', 'play' buttons depending on if user is logged in
init();
function init(){
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'sys_get_login' }),
        function ( data ) {
            var response = JSON.parse(data);
            if ( response['data']['login'] == true ) {
                $('#head-uname').parent().show();
                $('#head-uname').text( response['data']['uname'] );
                $('#nologin').hide();
            } else {
                $('#head-uname').parent().hide();
                $('#nologin').show();
            }
        }
    );
}

//thing to close modal
$('.modal-close').click(function(event){
    $(this).parents('.modal-background').hide();
});

$('.modal-background').click(function(event){
    if ( event.target.className == 'modal-background' ){
        $('.modal-background').hide();
    }
});

//stuff for 'login' form
$('#login-href').click(function(event){
    login_modal.parent().css( 'display', 'flex' );
});

$('#login-form').submit(function(event){
    $.post(
        api_address + 'api.php',
        JSON.stringify({
            'action': 'sys_login',
            'uname':encodeURI($('#login-uname').val()),
            'upass':encodeURI($('#login-upass').val()),
            'uremember': $('#login-uremember').is(':checked')
        }),
        function (data) {
            if ( JSON.parse(data)['status'] == 'success' ) {
                location.href = 'game.html';
            } else {
                $('#login-fail').show();
            }
        }
    )
});

//stuff for 'register' form
$('#register-href').click(function(event){
    register_modal.parent().css( 'display', 'flex' );
});

$('#register-form').submit(function(event){
    $.post(
        api_address + 'api.php',
        JSON.stringify({
            'action': 'sys_register',
            'uname': encodeURI($('#reg-uname').val()),
            'upass': encodeURI($('#reg-upass').val()),
            'upassconfirm': encodeURI($('#reg-upassconfirm').val()),
            'umail': encodeURI($('#reg-umail').val()),
            'umailconfirm': encodeURI($('#reg-umailconfirm').val())
        }),
        function (data) {
            data = JSON.parse(data);
            if ( data['status'] == 'success' ) {
                $('#reg-success').show();
            } else {
                switch ( data['statusmessage'] ) {
                    case 'emptyfields':
                        $('#reg-emptyfields').show();
                        break;
                    case 'invalid-symbols':
                        $('#reg-invalid-symbols').show();
                        break;
                    case 'uname-length':
                        $('#reg-uname-length').show();
                        break;
                    case 'upass-length':
                        $('#reg-upass-length').show();
                        break;
                    case 'pass-diff':
                        $('#reg-pass-diff').show();
                        break;
                    case 'mail-diff':
                        $('#reg-mail-diff').show();
                        break;
                    case 'user-exist':
                        $('#reg-user-exist').show();
                        break;
                    default:
                        alert( data );
                }
            }
        }
    );
});

//stuff for 'exit' button
$('#exit-href').click(function(event){
    $.post(
        api_address + 'api.php',
        JSON.stringify({
            'action': 'sys_exit'
        })
    );
    init();
});
