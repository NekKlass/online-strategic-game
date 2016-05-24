<?php

function get_api_file( $action ) {
    switch ( $action ) {
        //---------------------------
            case 'sys_login':
            case 'sys_exit':
            case 'sys_register':
            case 'sys_get_localization':
        //---------------------------
            case 'base_get':
            case 'base_get_buildable':
            case 'base_get_res':
            case 'base_upgrade_building':
            case 'base_build_building':
            case 'base_destroy_building':
        //---------------------------
            case 'global_map_get':
        //---------------------------
            case 'tech_tree_get':
            case 'tech_get':
            case 'tech_learn':
        //---------------------------
            return( 'core/' . $action . '.php' );
        //---------------------------
            default:
                return( '~~unknown~~' );
    }
}