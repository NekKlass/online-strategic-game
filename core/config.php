<?php

function get_config( $name, $par = null ) {
    switch ( $name ) {
        case 'GM_GAME_NAME':
            return('Strategy game');
        //сколько ресурсов дается при регистрации
        case 'GM_DEFAULT_RES':
            return array(
                'iron' => 1000,
                'food' => 1000,
                'water' => 1000
            );
        case 'db':
            require_once( 'utils/db.php' );
            return true;
        case 'res_update':
            require_once( 'utils/s_update_res.php' );
            return true;
        case 'db_config':
            require_once('config/db_config.php');
            return get_db_conf();
        case 'GM_BUILDINGS':
            //постройки
            return array(
                'iron-mine' => array (
                    'build-price' => array(
                        'iron' => 300
                    ),
                    'upgradable' => true,
                    'max-level' => '15',
                    'upgrade-price' => function ( $level ) {
                        return array(
                            'iron' => intval( ($level + 1)*100 ),
                        );
                    },
                    'ifincome' => true,
                    'income' => function ( $level, $time ) {
                        return array(
                            'iron' => $level * $time
                        );
                    }
                ),
                'food-farm' => array (
                    'build-price' => array(
                        'iron' => 300
                    ),
                    'upgradable' => true,
                    'max-level' => '40',
                    'upgrade-price' => function ( $level ) {
                        return array(
                            'iron' => intval( ($level + 1)*100 ),
                        );
                    },
                    'ifincome' => true,
                    'income' => function ( $level, $time ) {
                        return array(
                            'food' => $level * $time
                        );
                    }
                ),
                'water-well' => array (
                    'build-price' => array(
                        'iron' => 300
                    ),
                    'upgradable' => true,
                    'max-level' => '40',
                    'upgrade-price' => function ( $level ) {
                        return array(
                            'iron' => intval( ($level + 1)*100 ),
                        );
                    },
                    'ifincome' => true,
                    'income' => function ( $level, $time ) {
                        return array(
                            'water' => $level * $time
                        );
                    }
                )
            );
        case 'api_file':
            require_once( 'config/api_files.php' );
            return get_api_file( $par );
    }
}


?>