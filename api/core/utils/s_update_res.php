<?php

function s_update_res ( $id ) {

    get_stuff( 'db' );

    $data = db_custom("SELECT `resources`, `base`, `tech` FROM `bases` WHERE `id` = ?", array($id) );
    $buildings = get_stuff('buildings');
    $resources = json_decode( $data[0]['resources'], true );
    $base = json_decode( $data[0]['base'], true );
    $tech = json_decode( $data[0]['tech'], true );

    foreach ( $base as $value ) {
        //поиск постройки
        foreach ( $buildings as $building_value ) {
            if ( $value['name'] == $building_value['name'] ) {
                if ( !empty($building_value['income']) ) {
                    foreach ( $building_value['income'] as $income_key => $income_value ) {
                        //считаем доход
                        $time = $_SERVER['REQUEST_TIME'] - $resources[$income_key]['time'];
                        if ( $income_value > 60 ) {
                            $resources_per_second = floor( $income_value / 60 );
                            $resources[$income_key]['count'] = $resources[$income_key]['count'] + $time * $resources_per_second;
                            $resources[$income_key]['time'] = $_SERVER['REQUEST_TIME'];
                        } else {
                            $resources_unit_time = floor( 60 / $income_value );
                            $units = floor( $time / $resources_unit_time );
                            $resources[$income_key]['count'] = $resources[$income_key]['count'] + $units;
                            $resources[$income_key]['time'] = $resources[$income_key]['time'] + $units * $resources_unit_time;
                        }
                    }
                }
            }
        }
    }

    $resources = json_decode($data[0]['resources'], true);
    $base = json_decode($data[0]['base'], true);
    $tech = json_decode($data[0]['tech'], true);


    return $resources;

}

?>