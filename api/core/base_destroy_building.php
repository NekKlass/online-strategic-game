<?php

function process_request ( $request ) {

    if ( !isset($request['count']) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'no-count'
        );
    }

    $count = intval($request['count']);

    get_stuff('db');

    $base = db_custom("SELECT `base` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
    $base = json_decode( $base[0]['base'], true );

    array_splice( $base, $count, 1 );

    db_custom_no_return( "UPDATE `bases` SET `base` = ? WHERE `id` = ?",
        array( json_encode($base), $_SESSION['id'])
    );

    return array(
        'status' => 'success',
        'statusmessage' => 'success'
    );

}

?>
