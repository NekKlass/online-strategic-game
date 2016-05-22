<?php

function get_tech_tree(){
    return array(

        0 => array(
            0 => array(
                'tier' => 0,
                'branch' => 0,
                'require' => array()
            )
        ),

        1 => array(
            0 => array(
                'tier' => 1,
                'branch' => 0,
                'require' => array(
                    array( '0' => '0' )
                )
            ),
            1 => array(
                'tier' => 1,
                'branch' => 1,
                'require' => array(
                    array( '0' => '0' )
                )
            )
        )
    );

}

?>