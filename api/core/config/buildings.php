<?php

function get_buildings () {
    return array(

        array(
            'name' => '1-0',
            'require' => array (
                array (
                    'tier' => 1,
                    'branch' => 0
                )
            ),
            'price' => array (),
            'income' => array(
                'iron' => 5,
                'water' => 10,
            )
        )

    );
}

?>