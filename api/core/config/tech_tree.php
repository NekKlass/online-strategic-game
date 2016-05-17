<?php

function get_tech_tree(){
    return array(
    
        array(
            'tier' => 0,
            'branch' => 0,
            'require' => array(),
            'unlock' => false
        ),
        
        array(
            'tier' => 1,
            'branch' => 0,
            'require' => array( '0a' ),
            'unlock' => false
        ),
        
        array(
            'tier' => 1,
            'branch' => 1,
            'require' => array( '0a' ),
            'unlock' => true
        )
        
    );
    
}

?>