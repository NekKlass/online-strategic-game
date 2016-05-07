<?php

function process_request () {

    require_once('utils/s_update_res.php');
    $res = s_update_res( $_SESSION['id'] );

    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => $res
    );

}

?>