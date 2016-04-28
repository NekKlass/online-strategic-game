<?php

function process_request ( $request ) {
	
	if ( empty($request['uname']) || empty($request['upass']) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'nologindata'
		));
		exit;
	}
	
	$uname = urldecode( $request['uname'] );
	$upass = urldecode( $request['upass'] );
	
	require_once('utils/db.php');
	
	$login_data = db_custom( "SELECT `upass`, `uname`, `id` FROM `users` WHERE `uname` LIKE ? LIMIT 1 ",
		array($uname)
	);
	
	if ( empty($login_data) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'loginfail'
		));
		exit;
	}
	
	if ( password_verify($upass, $login_data[0]['upass']) ) {
		echo json_encode(array(
			'status' => 'success',
			'statusmessage' => 'success'
		));
		$_SESSION = array();
		$_SESSION['id'] = $login_data[0]['id'];
		$_SESSION['uname'] = $login_data[0]['uname'];
	} else {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'loginfail'
		));
	}
	
}
?>