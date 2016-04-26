var api_address = 'http://localhost/online-strategic-game-api/';

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


