<?php

function s_gen_base_cord () {
	
	$data = array();
	require_once('config.php');
	$x = 0;
	$y = 0;
	
	back:
		global $x, $y;
		$x = rand( -46000, 46000);
		$y = rand( -46000, 46000);
		$data = db_custom(" SELECT `id` FROM `bases` WHERE `x` = ? AND `y` = ? ",
			array(
				$x,
				$y
			)
		);
	if ( !empty($data) ) goto back;
	
	return array(
		'x' => $x, 
		'y' => $y 
	);
	
}


?>