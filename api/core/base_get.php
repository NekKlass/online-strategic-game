<?php

function get_base () {
	require_once('config.php');
	$data = db_custom( "SELECT `base` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
	echo $data['0']['base'];
}

?>