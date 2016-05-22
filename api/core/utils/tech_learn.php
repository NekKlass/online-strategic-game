<?php
function tech_learn( $par ) {
    //if all required techs learned
    foreach ( $par['require'] as $tier_key => $tier_value ) {
        foreach ( $tier_value as $branch_key => $branch_value ) {
            if ( empty($par['tree'][$tier_key][$branch_value]) ) {
                return array(
                    'status' => 'error',
                    'statusmessage' => 'not all required tech learned'
                );
            }
        }
    }
    //if enough resources
    foreach ( $par['price'] as $key => $value ) {
        if ( $par['res'][$key] < $value ) {
            return array(
                'status' => 'error',
                'statusmessage' => 'not enough'
            );
        } else {
            $par['res'][$key] = $par['res'][$key] - $value;
        }
    }

    return array(
        'res' => $par['res'],
        'status' => 'success'
    );
}
?>
