<?php 

function process_request ($request) {
    
    return array(
        'status' => 'success',
        'statusmessage' => 'success',
        'data' => get_stuff( 'tech_tree' )
    );
    
}

?>