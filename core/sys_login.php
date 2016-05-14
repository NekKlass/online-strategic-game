<?php

function process_request ( $request ) {

    if ( empty($request['uname']) || empty($request['upass']) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'nologindata'
        );
    }

    $uname = urldecode( $request['uname'] );
    $upass = urldecode( $request['upass'] );

    get_stuff( 'db' );

    $login_data = db_custom( "SELECT `upass`, `uname`, `id` FROM `users` WHERE `uname` LIKE ? LIMIT 1 ",
        array($uname)
    );

    if ( empty($login_data) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'loginfail'
        );
    }

    if ( password_verify($upass, $login_data[0]['upass']) ) {

        $_SESSION = array();
        $_SESSION['id'] = $login_data[0]['id'];
        $_SESSION['uname'] = $login_data[0]['uname'];
        return array(
            'status' => 'success',
            'statusmessage' => 'success'
        );

    } else {
        return array(
            'status' => 'error',
            'statusmessage' => 'loginfail'
        );
    }

}
?>