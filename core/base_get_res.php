<?php

function process_request () {

    get_config( 'res_update' );
    $res = s_update_res( $_SESSION['id'] );

    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => $res
    );

}

?>