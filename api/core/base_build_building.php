<?php

function process_request ( $request ) {

    if ( empty($request['name']) ) {
        return array(
            'status' => 'array',
            'statusmessage' => 'noname'
        );
    }
    $name = (string)$request['name'];

    get_stuff( 'res_update' );

    s_update_res( $_SESSION['id'] );

    $info = get_stuff('GM_BUILDINGS');

    if ( empty($info[$name]) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'unknown'
        );
    }
    $info = $info[$name]['build-price'];

    $data = db_custom( "SELECT `rescount`, `base` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
    $base = json_decode( $data[0]['base'] , true );
    $rescount = json_decode( $data[0]['rescount'] , true );

    $if_build = true;
    foreach ( $info as $key => $value ) {
        if ( ($rescount[$key] - $value) < 0 ) {
            $if_build = false;
        }
    }

    if ( $if_build ) {
        foreach ( $info as $key => $value ) {
            $rescount[$key] = $rescount[$key] - $value;
        }
        $building['name'] = $name;
        $building['level'] = 1;
        array_push( $base, $building );
        db_custom_no_return( "UPDATE `bases` SET `rescount` = ?, `base` = ? WHERE `id` = ?",
            array( json_encode($rescount), json_encode($base), $_SESSION['id'] )
        );
        return array(
            'status' => 'success',
            'statusmessage' => 'success'
        );
    } else {
        return array(
            'status' => 'error',
            'statusmessage' => 'not-enough'
        );
    }





}


?>