<?php

function process_request ( $request ) {
	
	//check if fields empty
	if ( empty($request['uname']) || empty($request['upass']) || empty($request['upassconfirm']) || empty($request['umail']) || empty($request['umailconfirm']) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'emptyfields'
		));
		exit;
	}
	
	//checking for invalid symbols
	if ( preg_match('#^[a-zA-Z][a-zA-Z0-9-_\.]$#', $request['upass']) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'invalid-symbols'
		));
		exit;
	}
	
	//checking 'uname' length 
	if ( (strlen($request['uname']) < 5) || (strlen($request['uname']) > 30) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'uname-length'
		));
		exit;
	}
	
	//checking 'upass' length 
	if ( (strlen($request['upass']) < 5) || (strlen($request['upass']) > 30) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'upass-length'
		));
		exit;
	}
	
	//checking if passwords differ
	if ( !($request['upass'] == $request['upassconfirm']) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'pass-diff'
		));
		exit;
	}
	
	//checking if mail adresses differ
	if ( $request['umail'] !== $request['umailconfirm'] ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'mail-diff'
		));
		exit;
	}
	
	require_once('utils/config.php');
	require_once('utils/db.php');
	
	if (empty( db_custom("SELECT `id` FROM `users` WHERE `uname` LIKE ?",array($request['uname'])) )){
		$uname = trim($request['uname']);
		$uname = stripcslashes($uname);
		$uname = htmlspecialchars($uname);
		//saving
		db_custom_no_return( "INSERT INTO `users` (`id`, `uname`, `upass`, `umail`, `reg_time`) VALUES (NULL, ?, ?, ?, ?)", 
			array( $uname, password_hash($request['upass'], PASSWORD_DEFAULT), $request['umail'], time() ) 
		);
		$id = db_custom( "SELECT `id` FROM `users` WHERE `uname` LIKE ?", 
			array( $uname ) 
		);
		require('utils/s_gen_base_cord.php');
		$cord = s_gen_base_cord();
		db_custom_no_return( "INSERT INTO `bases` ( `id`, `x`, `y`, `rescount`, `base`, `res_update_time`) VALUES ( ?, ?, ?, ?, ?, ? )", 
			array( $id['0']['id'], $cord['x'], $cord['y'], json_encode(get_config('GM_DEFAULT_RES')), json_encode(get_config('GM_DEFAULT_BASE')), $_SERVER['REQUEST_TIME'] )   
		); 
		//reporting success
		echo json_encode(array(
			'status' => 'success',
			'statusmessage' => 'success'
		));
		exit;
	} else {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'user-exist'
		));
		exit;
	}
	exit;
	
}
?>