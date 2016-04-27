var api_address = 'http://localhost/online-strategic-game-api/';
var login_form = $('#login-form'); 
var register_form = $('#register-form');
var exit_confitm = $('#exit-confirm');
var modal_background = $('#modal-background');

//hide 'login', 'exit', 'register', 'play' buttons depending on if user is logged in
$.post(
	api_address + 'api.php',
	JSON.stringify({ 'action': 'sys_get_login' }),
	function ( data ) {
		if ( JSON.parse(data)['data']['login'] == true ) {
			$('#login-href').hide();
			$('#register-href').hide();
		} else {
			$('#play-href').hide();
			$('#exit-href').hide();
		}
	}
);

//thing to close modal
$('.modal-close').click(function(event){
	$(this).parent().parent().hide();
});

//stuff for 'login' form
$('#login-href').click(function(event){
	login_form.parent().show();
});

$('#login-submit').click(function(event){
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
				window.location('game.html');
			} else {
				$('#login-fail').show();
			}
		}
	)
});

//stuff for 'register' form
$('#register-href').click(function(event){
	register_form.parent().show();
});

$('#reg-submit').click(function(event){
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
