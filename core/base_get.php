<?php

function process_request () {
	require_once('utils/db.php');
	$data = db_custom( "SELECT `base` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
	return array( 
		'status' => 'success',
		'statusmessage' => 'success',
		'data' => json_decode( $data['0']['base'], true )
	);
}

?>