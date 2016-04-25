<?php

function process_request() {
	require_once('config.php');
	echo json_encode(get_config('GM_LOCALIZATION'));
}