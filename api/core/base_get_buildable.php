<?php

function process_request() {

    $buidable = get_stuff( 'buildings' );

    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => $buidable
    );
}


?>