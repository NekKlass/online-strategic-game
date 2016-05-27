<?php

function process_request ($request) {

    if ( !isset($request['tier']) || !isset($request['branch']) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'no tier or branch privoded'
        );
    }

    $tier = $request['tier'];
    $branch = $request['branch'];

    get_stuff( 'tech_tree' );

    $tech_tree = get_tech_tree();

    if ( empty( $tech_tree[$tier][$branch] ) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'unknown tech'
        );
    } else {
        $tech = $tech_tree[$tier][$branch];
    }

    get_stuff( 'res_update' );
    $res = s_update_res( $_SESSION['id'] );

    $tech_user = json_decode( db_custom("SELECT `tech` FROM `bases` WHERE `id` = ?", array($_SESSION['id']) )['0']['tech'], true );

    if ( !empty($tech_user[$tier][$branch]) ) {
        return array(
            'status' => 'error',
            'statusmessage' => 'already learned'
        );
    }

    $response = tech_learn( array(
        'res' => $res,
        'tree' => $tech_user,
        'require' => $tech['require'],
        'price' => $tech['price']
    ));

    if ( $response['status'] == 'success' ) {

        $tech_user[$tier][$branch] = array( 'learned' => 'true');
        db_custom_no_return(
            'UPDATE `bases` SET `rescount` = ?, `tech`=?  WHERE `id` = ?' ,
            array(
                json_encode( $response['res'] ),
                json_encode( $tech_user ),
                $_SESSION['id']
            )
        );
        return array(
            'status' => 'success',
            'statusmessage' => 'success'
        );

    } else {
        return $response;
    }

}

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