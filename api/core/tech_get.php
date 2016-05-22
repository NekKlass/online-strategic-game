<?php

function process_request ($request) {

    get_stuff( 'db' );
    $data = db_custom("SELECT `tech` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) )[0]['tech'];

    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => json_decode( $data, true )
    );

}

?>