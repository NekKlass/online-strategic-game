<?php

function get_db_conf () {
    $host = '127.0.0.1';
    $db_name = 'game';
    $user = 'game';
    $pass = '';
    $options = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );

    return array (
        'adress' => 'mysql:host='. $host . ';dbname=' . $db_name,
        'user' => $user,
        'pass' => $pass,
        'options' =>    $options
    );

}