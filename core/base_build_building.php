<?php

function process_request() {
	
	$x = intval($_POST['x']);
	$y = intval($_POST['y']);
	$name = $_POST['what'];
	
	if ( (empty($name)) || ($name == 'base-empty') ) {
		echo 'empty';
		exit;
	}
	
	require_once('s_update_res.php');
	require_once('config.php');
	
	s_update_res( $_SESSION['id'] );
	
	$info = get_config('GM_BUILDINGS');
	
	if ( empty($info[$name]) ) {
		echo 'unknown';
		exit;
	}
	$info = $info[$name]['build-price'];
	
	$data = db_custom( "SELECT `rescount`, `base` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
	$base = json_decode( $data[0]['base'] , true );
	$rescount = json_decode( $data[0]['rescount'] , true );
	
	if ( ($x > ($base['x'] - 1)) || ($y > ($base['y'] - 1)) || ($x < 0) || ($y < 0) ) {
		echo 'cord-outbound';
		exit;
	}
	
	if ( $base['map'][$x][$y]['name'] <> 'base-empty') {
		echo 'already';
		exit;
	}
	
	$if_build = true;
	foreach ( $info as $key => $value ) {	
		if ( ($rescount[$key] - $value) < 0 ) {
			$if_build = false; 
		}
	}
	
	if ( $if_build ) {
		foreach ( $info as $key => $value ) {	
			$rescount[$key] = $rescount[$key] - $value;
		}
		$base['map'][$x][$y]['name'] = $name;
		$base['map'][$x][$y]['level'] = 1;
		db_custom_no_return( "UPDATE `bases` SET `rescount` = ?, `base` = ? WHERE `id` = ?",
			array( json_encode($rescount), json_encode($base), $_SESSION['id'] )
		);
		echo 'success';
	} else {
		echo 'not-enough';
		exit;
	}




	
}


?>