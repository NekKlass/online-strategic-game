<?php

function process_request() {

    if ( !isset($_POST['x']) || !isset($_POST['y']) ) {
        echo 'no-cord';
        exit;
    }

    $x = intval($_POST['x']);
    $y = intval($_POST['y']);

    get_stuff( 'db.php' );
    $data = db_custom( "SELECT `base` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) );
    $base = json_decode( $data[0]['base'], true );

    if ( ($x > ($base['x'] - 1)) || ($y > ($base['y'] - 1)) || ($x < 0) || ($y < 0) ) {
        echo 'cord-outbound';
        exit;
    }

    $empty = array(
        'name' => 'base-empty'
    );

    $base['map'][$x][$y] = $empty;

    db_custom_no_return( "UPDATE `bases` SET `base` = ? WHERE `id` = ?",
        array(
            json_encode($base),
            $_SESSION['id']
        )
    );
    echo 'success';
}


?>