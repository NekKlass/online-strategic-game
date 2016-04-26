var api_address = 'http://localhost/online-strategic-game-api/'

$.post(
	api_address + 'api.php',
	JSON.stringify({ 'action': 'sys_get_login' }),
	function (data) {
		alert(data);
	}
);
