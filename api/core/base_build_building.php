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

    $info = get_stuff('buildings');

    $building = array();
    foreach ( $info as $value ) {
        if ( $value['name'] == $name ) {
            $building = $value;
            break;
        }
    }
    if ( empty($building) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'unknown'
        );
    }

    $data = db_custom( "SELECT `resources`, `base`, `tech` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
    $base = json_decode( $data[0]['base'] , true );
    $resources = json_decode( $data[0]['resources'] , true );
    $tech = json_decode( $data[0]['tech'] , true );

    foreach ( $building['price'] as $key => $value ) {
        if ( ($resources[$key]['count'] - $value) < 0 ) {
            return array(
                'status' => 'error',
                'statusmessage' => 'not enough'
            );
        }
        $resources[$key]['count'] = $resources[$key]['count'] - $value;
    }

    $new_building['name'] = $name;
    $new_building['level'] = 1;
    array_push( $base, $new_building );
    db_custom_no_return( "UPDATE `bases` SET `resources` = ?, `base` = ? WHERE `id` = ?",
        array( json_encode($resources), json_encode($base), $_SESSION['id'] )
    );
    return array(
        'status' => 'success',
        'statusmessage' => 'success'
    );

}


?>