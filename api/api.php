<?php

$core_path = '';

if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
	
	session_start();
	
	//если не залогинился
	if ( !isset($_SESSION['id']) ) {
		$_SESSION['id'] = 0;
	}
	
	//обработка запроса
	$request_str = file_get_contents('php://input'); 
	if ( $request_str == '' ) {
		
		//если запрос пустой
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'nologin'
		));
		exit;
		
	}
		
	if ( strlen($request_str) > 100 ) {
		//если запрос пустой
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'jsonlong'
		));
		exit;
	}
	
	// переработка запроса
	$request = json_decode( $request_str, true, 4 );
	$request_error = json_last_error();
	
	//ошибка
	if ( $request_error <> JSON_ERROR_NONE ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'jsonmistake'
		));
		exit;
	}		
		
	//если выбрано, что делать 
	if ( empty($request['action']) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'noaction'
		));
		exit;
	}
	
	if ( ($_SESSION['id'] == 0) && ($request['action'] != 'login') && ($request['action'] != 'register') )  {
		echo json_encode(array(
			'status' => 'error',
			'statusmessage' => 'nologin'
		));
		exit;
	}
	
	
	//выбираем действие
	switch ( $request['action'] ) {
		//--------------------------
		//  авторизационные вещи
		//--------------------------
			case 'login':
				require_once( $core_path . 'core/login.php' );
				login($request);
				break;
			case 'exit':
				require_once( $core_path . 'core/exit.php' );
				exit($request);
				break;
			case 'register':
				require_once( $core_path . 'core/register.php' );
				register($request);
				break;
		//--------------------------
		// все, что связано с базой
		//--------------------------
			case 'base-get':
				require_once( $core_path . 'core/get_base.php' );
				get_base($request);
				break;
			case 'base-get-buildable':
				require_once( $core_path . 'core/get_buildable.php' );
				get_buildable($request);
				break;
			case 'base-upgrade-building':
				require_once( $core_path . 'core/base_upgrade.php' );
				base_upgrade($request);
				break;
			case 'base-build':
				require_once( $core_path . 'core/base_build.php' );
				base_build($request);
				break;
			case 'base-destroy-building':
				require_once( $core_path . 'core/base_destroy.php' );
				base_destroy($request);
				break;
		//--------------------------
		//      глобальная карта
		//--------------------------		
			case 'get-map':
				require_once( $core_path . 'core/get_map.php' );
				get_map($request);
				break;
		//--------------------------
		//         разное
		//--------------------------
		case 'get-localization':
			require_once( $core_path . 'core/get_localization.php' );
			get_localization($request);
			break;	
		default:
			echo json_encode(array(
				'status' => 'error',
				'statusmessage' => 'unknownaction'
			));
	}	
	exit;
}
?>


