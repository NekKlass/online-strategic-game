<?php

function s_update_res ( $id ) {
	
	require_once('core/config/config.php');
	require_once('db.php');
	
	$data = db_custom("SELECT `rescount`, `res_update_time`, `base` FROM `bases` WHERE `id` = ?", array($id) );
	$buildings = get_config('GM_BUILDINGS');
	
	$base = json_decode($data[0]['base'], true);
	$res = json_decode($data[0]['rescount'], true);
	
	$time = $_SERVER['REQUEST_TIME'] - $data[0]['res_update_time'];
	
	foreach ( $base as $keysec => $valuesec ) {
		if ( $buildings[$valuesec['name']]['ifincome'] == true ) {
			$income = $buildings[ $valuesec['name'] ]['income']( $valuesec['level'], $time);
			foreach ( $income as $key => $value ) {
				$res[$key] = $res[$key] + $value;
			}
		}
	}
	
	db_custom_no_return("UPDATE `bases` SET `rescount` = ?, `res_update_time` = ? WHERE `id` = ?", array( 
		json_encode($res),
		$_SERVER['REQUEST_TIME'],
		$id
	));
	
	return $res;
	
}

?>