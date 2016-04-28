<?php

function process_request ( $request ) {
	
	echo json_encode(array(
		'status' => 'success',
		'statusmessage' => 'success',
		'data' => array(
			'login' => ! empty( $_SESSION['id'] ),
			'id' => $_SESSION['id'],
			'uname' => $_SESSION['uname']
		)
	));
	
}

?>