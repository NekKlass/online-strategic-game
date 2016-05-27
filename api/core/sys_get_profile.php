<?php

function process_request ( $request ) {

    get_stuff( 'db' );
    $profile = db_custom( "SELECT `reg_time` FROM `users` WHERE `id` = ?", array($_SESSION['id']) )[0];
    
    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => $profile
    );

}

?>
