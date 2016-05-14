<?php 

function get_buildings () {
    
    return array(
        'iron-mine' => array (
            'build-price' => array(
                'iron' => 300
            ),
            'upgradable' => true,
            'max-level' => '15',
            'upgrade-price' => function ( $level ) {
                return array(
                    'iron' => intval( ($level + 1)*100 ),
                );
            },
            'ifincome' => true,
            'income' => function ( $level, $time ) {
                return array(
                    'iron' => $level * $time
                );
            }
        ),
        'food-farm' => array (
            'build-price' => array(
                'iron' => 300
            ),
            'upgradable' => true,
            'max-level' => '40',
            'upgrade-price' => function ( $level ) {
                return array(
                    'iron' => intval( ($level + 1)*100 ),
                );
            },
            'ifincome' => true,
            'income' => function ( $level, $time ) {
                return array(
                    'food' => $level * $time
                );
            }
        ),
        'water-well' => array (
            'build-price' => array(
                'iron' => 300
            ),
            'upgradable' => true,
            'max-level' => '40',
            'upgrade-price' => function ( $level ) {
                return array(
                    'iron' => intval( ($level + 1)*100 ),
                );
            },
            'ifincome' => true,
            'income' => function ( $level, $time ) {
                return array(
                    'water' => $level * $time
                );
            }
        )
    );
    
}

?>