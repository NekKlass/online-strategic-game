<?php

//send request to db and get reponse
function db_custom ( $querry, $parametres ) {

    $config = get_stuff( 'db_config' );

    $pdo = new PDO( $config['adress'], $config['user'], $config['pass'], $config['options'] );
    $data = $pdo -> prepare( $querry );
    $data -> execute( $parametres );

    return $data -> fetchall( PDO::FETCH_ASSOC );

}

//send request to db and do not get response
function db_custom_no_return ( $querry, $parametres ) {

    $config = get_stuff( 'db_config' );

    $pdo = new PDO( $config['adress'], $config['user'], $config['pass'], $config['options'] );
    $data = $pdo -> prepare( $querry );
    $data -> execute( $parametres );

}


?>