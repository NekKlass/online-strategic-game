<?php

function s_update_res ( $id ) {

    get_stuff( 'db' );

    $data = db_custom("SELECT `resources`, `base`, `tech` FROM `bases` WHERE `id` = ?", array($id) );
    $buildings = get_stuff('buildings');

    $resources = json_decode($data[0]['resources'], true);
    $base = json_decode($data[0]['base'], true);
    $tech = json_decode($data[0]['tech'], true);


    return $resources;

}

?>