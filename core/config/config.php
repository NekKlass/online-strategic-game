<?php

function get_config( $name ) {
    switch ( $name ) {
        case 'GM_GAME_NAME':
            return('Strategy game');
        case 'GM_DEFAULT_BASE':
            return array(
                '0' => array('name' => 'base-empty'),
                '1' => array('name' => 'base-empty'),
                '2' => array('name' => 'base-empty'),
                '3' => array('name' => 'base-empty'),
                '4' => array('name' => 'base-empty'),
                '5' => array('name' => 'base-empty'),
                '6' => array('name' => 'base-empty')
            );
        //сколько ресурсов дается при регистрации
        case 'GM_DEFAULT_RES':
            return array(
                'metal' => 1000,
                'food' => 1000,
                'water' => 1000
            );
        case 'GM_BUILDINGS':
            //постройки
            return array(
                'miner-metal' => array (
                    'build-price' => array(
                        'metal' => 300
                    ),
                    'upgradable' => true,
                    'max-level' => '15',
                    'upgrade-price' => function ( $level ) {
                        return array(
                            'metal' => intval( ($level + 1)*100 ),
                        );
                    },
                    'ifincome' => true,
                    'income' => function ( $level, $time ) {
                        return array(
                            'metal' => $level * $time
                        );
                    }
                ),
                'miner-food' => array (
                    'build-price' => array(
                        'metal' => 300
                    ),
                    'upgradable' => true,
                    'max-level' => '40',
                    'upgrade-price' => function ( $level ) {
                        return array(
                            'metal' => intval( ($level + 1)*100 ),
                        );
                    },
                    'ifincome' => true,
                    'income' => function ( $level, $time ) {
                        return array(
                            'food' => $level * $time
                        );
                    }
                ),
                'miner-water' => array (
                    'build-price' => array(
                        'metal' => 300
                    ),
                    'upgradable' => true,
                    'max-level' => '40',
                    'upgrade-price' => function ( $level ) {
                        return array(
                            'metal' => intval( ($level + 1)*100 ),
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
}


?>