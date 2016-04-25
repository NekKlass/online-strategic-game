<?php

function get_config( $name ) {
	switch ( $name ) {
		case 'GM_GAME_NAME':
			return('Strategy game');
			exit;
		case 'GM_DB_HOST':
			return '127.0.0.1';
			exit;
		case 'GM_DB_NAME':
			return 'game';
			exit;
		case 'GM_DB_USER':
			return 'game';
			exit;
		case 'GM_DB_PASS':
			return ;
			exit;
		case 'GM_SQL_ADRESS':
			return 'mysql:host='. get_config('GM_DB_HOST') . ';dbname=' . get_config('GM_DB_NAME');
			exit;
		case 'GM_SQL_OPTIONS':
			return array(
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
			);
			exit;
		case 'GM_DEFAULT_BASE':	
			return array(
				'x' => 3,
				'y' => 3,
				'map' => array(
					'0' => array(
						'0' => array('name' => 'base-empty'),
						'1' => array('name' => 'base-empty'),
						'2' => array('name' => 'base-empty')
					),
					'1' => array(
						'0' => array('name' => 'base-empty'),
						'1' => array('name' => 'base-empty'),
						'2' => array('name' => 'base-empty')
					),
					'2' => array(
						'0' => array('name' => 'base-empty'),
						'1' => array('name' => 'base-empty'),
						'2' => array('name' => 'base-empty')
					)
				)
			);
			exit;
		//сколько ресурсов дается при регистрации		
		case 'GM_DEFAULT_RES':
			return array(
				'metal' => 1000,
				'food' => 1000,
				'water' => 1000
			);
			exit;	
		case 'GM_BUILDINGS':
			//постройки
			return array(
				'base-empty' => array(
					'upgradable' => false,
					'ifincome' => false
				),
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
							'metal' => $level * $time
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
							'metal' => $level * $time
						);
					}
				)
			);
			exit;
		case 'GM_LOCALIZATION':
			return array(
				'metal' => array(
					'ru' => 'металл',
					'en' => 'metal'
				),
				'food' => array(
					'ru' => 'еда',
					'en' => 'food'
				),
				'water' => array(
					'ru' => 'вода',
					'en' => 'water'
				),
				'base-empty' => array(
					'ru' => 'пусто',
					'en' => 'empty'
				),
				'miner-metal' => array(
					'ru' => 'рудная шахта',
					'en' => 'ore mine'
				),
				'miner-food' => array(
					'ru' => 'ферма еды',
					'en' => 'food farm'
				),
				'miner-water' => array(
					'ru' => 'водонапорная башня',
					'en' => 'water tower'
				)
			);
			exit;
	}
}


?>