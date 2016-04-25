<?php

function register ( $request ) {
	
	// проверка на пустоту полей
	if ( empty($request['uname']) || empty($request['upass']) || empty($request['upassconfirm']) || empty($request['umail']) || empty($request['umailconfirm']) ) {
		echo json_encode(array(
			'status' => 'error',
			'statusinfo' => get_code('emptyjson')
		));
		exit;
	}
	
	//проверка на символы
	if ( preg_match('#^[a-zA-Z][a-zA-Z0-9-_\.]$#', $request['upass']) ) {
		echo 'invalid-symbols';
		exit;
	}
	
	// проверяем на длину
	if ( (strlen($request['uname']) < 5) || (strlen($request['uname']) > 30) ) {
		echo 'uname-length';
		exit;
	}
	
	if ( (strlen($request['upass']) < 5) || (strlen($request['upass']) > 30) ) {
		echo 'upass-length';
		exit;
	}
	
	// если вдруг пароли отличаются
	if ( !($request['upass'] == $request['upassconfirm']) ) {
		echo 'pass-diff';
		exit;
	}
	// если вдруг адресы почты отличаются
	if ( $request['umail'] !== $request['umailconfirm'] ) {
		echo 'mail-diff';
		exit;
	}
	
	require_once('config.php');
	require_once('db.php');
	
	if (empty( db_custom("SELECT `id` FROM `users` WHERE `uname` LIKE ?",array($request['uname'])) )){
		$uname = trim($request['uname']);
		$uname = stripcslashes($uname);
		$uname = htmlspecialchars($uname);
		//сохраняем инфу
		db_custom_no_return( "INSERT INTO `users` (`id`, `uname`, `upass`, `umail`, `reg_time`) VALUES (NULL, ?, ?, ?, ?)", 
			array( $uname, password_hash($request['upass'], PASSWORD_DEFAULT), $request['umail'], time() ) 
		);
		$id = db_custom( "SELECT `id` FROM `users` WHERE `uname` LIKE ?", 
			array( $uname ) 
		);
		require('game/s_gen_base_cord.php');
		$cord = s_gen_base_cord();
		db_custom_no_return( "INSERT INTO `bases` ( `id`, `x`, `y`, `rescount`, `base`, `res_update_time`) VALUES ( ?, ?, ?, ?, ?, ? )", 
			array( $id['0']['id'], $cord['x'], $cord['y'], json_encode(get_config('GM_DEFAULT_RES')), json_encode(get_config('GM_DEFAULT_BASE')), $_SERVER['REQUEST_TIME'] )   
		); 
		//конец сохранения инфы
		echo 'success';
	} else {
		echo 'exist';
		exit;
	}
	exit;
	
}
?>