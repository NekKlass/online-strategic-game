<?php

$core_path = '';

header('Content-Type: text/html; charset=utf-8');

if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
	$start_time = microtime( true );
	
	session_start();
	
	//if thre no login
	if ( empty($_SESSION['id']) ) {
		$_SESSION['id'] = 0;
		$_SESSION['uname'] = '';
	}
	
	//request is empty
	$request_str = file_get_contents('php://input'); 
	if ( $request_str == '' ) {
		
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'nologin'
		));
		exit;
		
	}
	
	//request is too long
	if ( strlen($request_str) > 200 ) {
		
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'jsonlong'
		));
		exit;
	}
	
	//preparing values
	$request = json_decode( $request_str, true, 4 );
	$request_error = json_last_error();
	
	//error in json
	if ( $request_error <> JSON_ERROR_NONE ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'jsonmistake'
		));
		exit;
	}		
		
	//checking if there action
	if ( empty($request['action']) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'noaction'
		));
		exit;
	}
	
	//check if users is logged in
	//for sys_login and sys_register login is not required
	if ( ($_SESSION['id'] == 0) && ($request['action'] != 'sys_login') && ($request['action'] != 'sys_register') && ($request['action'] != 'sys_get_login')) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'nologin'
		));
		exit;
	}
	
	//performing action
	require( $core_path . 'core/config/api_files.php' );
	$file = get_api_file( $request['action'] );
	
	if ( $file == '~~unknown~~' ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'unknownaction'
		));
		exit;
	}
	require( $core_path . $file );
	$response = process_request($request);
	
	$response['time'] = microtime( true ) - $start_time;
	echo json_encode($response);
	
	exit;
}
?>


