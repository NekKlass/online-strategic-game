<?php

function get_tech_tree(){
    return array(

        0 => array(
            0 => array(
                'require' => array(),
                'price' => array(
                    'wood' => 50
                )
            )
        ),

        1 => array(
            0 => array(
                'require' => array(
                    0 => array(0)
                ),
                'price' => array(
                    'wood' => 5
                )
            ),
            1 => array(
                'require' => array(
                    0 => array(0)
                ),
                'price' => array(
                    'wood' => 100,
                    'iron' => 50
                )
            )
        )
    );

}

?>