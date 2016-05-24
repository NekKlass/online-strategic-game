<?php

function process_request() {

    $buidable = get_stuff( 'GM_BUILDINGS' );

    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => $buidable
    );
}


?>