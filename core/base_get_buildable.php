<?php

function process_request() {
    require_once('config/config.php');

    $buidable = get_config('GM_BUILDINGS', true);

    foreach ( $buidable as $name => $item ) {
        //build-price
        $building['build-price'] = $item['build-price'];
        //upgrade-price
        $building['upgradable'] = $item['upgradable'];
        if ( $item['upgradable'] == true ) {
            $building['max-level'] = $item['max-level'];
            for ( $i = 1; $i < $item['max-level']; $i++ ) {
                $building['upgrade-price'][$i] = $item['upgrade-price']( $i );
            }
        }
        //income
        $building['ifincome'] = $item['ifincome'];
        if ( $item['ifincome'] == true ) {
            for ( $i = 1; $i <= $item['max-level']; $i++ ) {
                $building['income'][$i] = $item['income']($i, 1);
            }
        }
        $response[$name] = $building;
    }

    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => $response
    );
}


?>