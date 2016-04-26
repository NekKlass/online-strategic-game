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

//when user click 'login' button
$('#login-href').click(function(event){
	login_form.parent().show();
}); 

$('#register-href').click(function(event){
	register_form.parent().show();
});
