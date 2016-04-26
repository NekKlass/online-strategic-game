<?php

function process_request() {
	require_once('core/config.php');
	echo json_encode(array(
		'status' => 'success',
		'statusmessage' => 'success',
		'data' => get_config('GM_LOCALIZATION')
	));
}