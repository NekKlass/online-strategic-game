function register() {
	$('#empty').hide();
	$('#invalid-symbols').hide();
	$('#length').hide();
	$('#pass-diff').hide();
	$('#mail-diff').hide();
	$('#exist').hide();
	$('input:not([type=submit])').css({ 'border-color': '', 'border-style': '' });
	$.post(
		"register.php",
		$('form').serialize(),
		function(data){
			switch (data) {
				case 'empty':
					$('#empty').show();
					//$('form').css('height',230);
					$('input:not([type=submit])').css({ 'border-color': 'rgb(255, 131, 131)', 'border-style': 'solid' });
					break;
				case 'invalid-symbols':
					$('#invalid-symbols').show();
					$('[name=uname]').css({ 'border-color': 'rgb(255, 131, 131)', 'border-style': 'solid' });
					break;
				case 'uname-length':
					$('#length').show();
					$('[name=uname]').css({ 'border-color': 'rgb(255, 131, 131)', 'border-style': 'solid' });
					break;
				case 'upass-length':
					$('#length').show();
					$('[name=upass]').css({ 'border-color': 'rgb(255, 131, 131)', 'border-style': 'solid' });
					break;
				case 'pass-diff':
					$('#pass-diff').show();
					$('[name=upass], [name=upassconfirm]').css({ 'border-color': 'rgb(255, 131, 131)', 'border-style': 'solid' });
					break;
				case 'mail-diff':
					$('#mail-diff').show();
					$('[name=umail], [name=umailconfirm]').css({ 'border-color': 'rgb(255, 131, 131)', 'border-style': 'solid' });
					break;
				case 'success':
					$('form').hide();
					$('#success').show();
				case 'exist':
					$('#exist').show();
					//$('form').css('height',230);
					$('[name=uname]').css({ 'border-color': 'rgb(255, 131, 131)', 'border-style': 'solid' });
					break;
				default:
					alert(data);
			}
		}
	);
}