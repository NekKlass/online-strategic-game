<?php

function process_request () {
	
	if ( !isset($_POST['x']) || !isset($_POST['y']) ) {
		echo 'no-cord';
		exit;
	}
	
	$x = intval($_POST['x']);
	$y = intval($_POST['y']);
	
	require_once('config.php');
	$data = db_custom( "SELECT `rescount`, `base` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
	$data = $data['0'];
	
	$base = json_decode( $data['base'], true );
	$rescount = json_decode( $data['rescount'], true );
	
	if ( ($x > ($base['x'] - 1)) || ($y > ($base['y'] - 1)) || ($x < 0) || ($y < 0) ) {
		echo 'cord-outbound';
		exit;
	}
	
	$name = $base['map'][$x][$y]['name'];
	$level = $base['map'][$x][$y]['level'];
	$upgrade_info = get_config( 'GM_BUILDINGS' )[$name];
	$price = $upgrade_info['upgrade-price']($level);
	
	if ( $upgrade_info['upgradable'] == false ) {
		echo 'not-upgradable';
		exit;
	}
	
	if ( $level >= $upgrade_info['max-level'] ) {
		echo 'max';
		exit;
	}
	
	$if_upgrade = true;
	
	foreach ( $price as $key => $value ) {
		if ( $rescount[$key] < $price[$key] ) {
			$if_upgrade = false;
		}
	}
	
	if ( $if_upgrade ) {
		foreach ( $price as $key => $value ) {
			$rescount[$key] = $rescount[$key] - $value;
		}
		$base['map'][$x][$y]['level'] = $base['map'][$x][$y]['level'] + 1;
		db_custom_no_return( "UPDATE `bases` SET `rescount` = ?, `base` = ? WHERE `id` = ?", 
			array( 
				json_encode($rescount),
				json_encode($base),
				$_SESSION['id']) 
		);
		echo 'success';
	} else {
		echo 'not-enough';
	}
	
}


?>