<?php

function get_api_file( $action ) {
    switch ( $action ) {
        //---------------------------
            case 'sys_login':
                return( 'core/sys_login.php' );
                break;
        //---------------------------
            case 'sys_exit':
                return( 'core/sys_exit.php' );
                break;
        //---------------------------
            case 'sys_register':
                return( 'core/sys_register.php');
                break;
        //---------------------------
            case 'sys_get_login':
                return( 'core/sys_get_login.php' );
                break;
        //---------------------------
            case 'sys_get_localization':
                return( 'core/sys_get_localization.php' );
                break;
        //---------------------------
            case 'base_get':
                return( 'core/base_get.php' );
                break;
        //---------------------------
            case 'base_get_buildable':
                return( 'core/base_get_buildable.php' );
                break;
        //---------------------------
            case 'base_get_res':
                return( 'core/base_get_res.php' );
                break;
        //---------------------------
            case 'base_upgrade_building':
                return( 'core/base_upgrade_building.php' );
                break;
        //---------------------------
            case 'base_build_building':
                return( 'core/base_build_building.php' );
                break;
        //---------------------------
            case 'base_destroy_building':
                return( 'core/base_destroy_building.php' );
                break;
        //---------------------------
            case 'global_map_get':
                return( 'core/get_map.php' );
                break;
        //---------------------------
            case 'tech_tree_get':
                return( 'core/tech_tree_get.php' );
                break;
        //---------------------------
            case 'tech_get':
                return( 'core/tech_get.php' );
                break;
        //---------------------------
            case 'tech_learn':
                return( 'core/tech_learn.php' );
                break;
        //---------------------------
            default:
                return( '~~unknown~~' );
                break;
    }
}