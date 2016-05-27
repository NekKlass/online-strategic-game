<?php

function get_stuff( $name, $par = null ) {
    switch ( $name ) {
        //сколько ресурсов дается при регистрации
        case 'GM_DEFAULT_RES':
            return array(
                'iron' => array(
                    'count' => 1000,
                    'time' => $_SERVER['REQUEST_TIME']
                ),
                'food' => array(
                    'count' => 1000,
                    'time' => $_SERVER['REQUEST_TIME']
                ),
                'water' => array(
                    'count' => 1000,
                    'time' => $_SERVER['REQUEST_TIME']
                ),
                'wood' => array(
                    'count' => 1000,
                    'time' => $_SERVER['REQUEST_TIME']
                )
            );
        case 'db':
            require_once( 'utils/db.php' );
            return true;
        case 'get_localization':
            require_once( 'config/get_localization.php' );
            return get_localization();
        case 'res_update':
            require_once( 'utils/s_update_res.php' );
            return true;
        case 'db_config':
            require_once( 'config/db_config.php' );
            return get_db_conf();
        case 'buildings':
            require_once( 'config/buildings.php' );
            return get_buildings();
        case 'tech_tree':
            require_once ( 'config/tech_tree.php' );
            return get_tech_tree();
        case 'api_file':
            require_once( 'config/api_files.php' );
            return get_api_file( $par );
        case 'base_gen_cord':
            require('utils/s_gen_base_cord.php');
            return s_gen_base_cord();
    }
}

?>
