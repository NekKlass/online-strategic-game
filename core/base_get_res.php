<?php

function process_request () {
	
	require_once('utils/s_update_res.php');
	s_update_res( $_SESSION['id'] );
	$data = db_custom("SELECT `rescount` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
	return array(
		'status' => 'success',
		'statusmessage' => 'success',
		'data' => $data[0]['rescount']
	);

}

?>