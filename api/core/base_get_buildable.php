<?php

function process_request ( $request ) {

    $buidable = get_stuff( 'buildings' );

    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => $buidable
    );
}

?>
