function login() {
	$.post(
		'api/api.php',
		JSON.stringify({ 'action':'login', 'uname':encodeURI($('#uname').val()), 'upass':encodeURI($('#upass').val()) }),
		function(data){
			switch (JSON.parse(data)['status']) {
				case 'error':
					$('#fail').show();
					break;
				case 'success':
					window.location.href = 'game.php';
					break;
				default:
					alert(data);
			}
		}
	);
}