<?php

function process_request($request) {
	session_start();
	$_SESSION['id'] = 0; 
	header('Location: index.php');
}
?>
