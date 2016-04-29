<?php

function process_request() {
	require_once('core/config.php');
	return array(
		'status' => 'success',
		'statusmessage' => 'success',
		'data' => get_config('GM_LOCALIZATION')
	);
	
}