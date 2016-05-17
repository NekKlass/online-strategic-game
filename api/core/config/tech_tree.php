<?php

function get_tech_tree(){
    return array(
    
        '0' => array(
            'require' => array(),
            'unlock' => false
        ),
        
        '1a' => array(
            'require' => array( '0a' ),
            'unlock' => false
        ),
        
        '1b' => array(
            'require' => array( '0a' ),
            'unlock' => true
        )
        
    );
    
}

?>