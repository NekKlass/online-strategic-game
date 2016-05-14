<?php

function process_request ($request) {

    if ( !isset($request['position']) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'noposition'
        );
    }

    $position = intval($request['position']);

    get_config( 'db' );
    $data = db_custom( 'SELECT `rescount`, `base` FROM `bases` WHERE `id` = ?', array($_SESSION['id']) );
    $data = $data['0'];

    $base = json_decode( $data['base'], true );
    $rescount = json_decode( $data['rescount'], true );

    if ( $position >= count($base) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'positionoutbound'
        );
    }

    require('config.php');
    $name = $base[$position]['name'];
    $level = $base[$position]['level'];
    $upgrade_info = get_config( 'GM_BUILDINGS' )[$name];
    $price = $upgrade_info['upgrade-price']($level);

    if ( $upgrade_info['upgradable'] == false ) {
        return array(
            'status' => 'error',
            'statusmesage' => 'notupgradable'
        );
    }

    if ( $level >= $upgrade_info['max-level'] ) {
        return array(
            'status' => 'error',
            'statusmesage' => 'maxlevel'
        );
    }

    $if_upgrade = true;

    foreach ( $price as $key => $value ) {
        if ( $rescount[$key] < $price[$key] ) {
            $if_upgrade = false;
        }
    }

    if ( $if_upgrade ) {
        foreach ( $price as $key => $value ) {
            $rescount[$key] = $rescount[$key] - $value;
        }
        $base[$position]['level']++;
        db_custom_no_return( "UPDATE `bases` SET `rescount` = ?, `base` = ? WHERE `id` = ?",
            array(
                json_encode($rescount),
                json_encode($base),
                $_SESSION['id'])
        );
        return array(
            'status' => 'success',
            'statusmessage' => 'success'
        );
    } else {
        return array(
            'status' => 'success',
            'statusmessage' => 'notenough'
        );
    }

}


?>