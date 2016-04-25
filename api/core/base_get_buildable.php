<?php

function get_buildable() {
	require_once('config.php');
	
	$buidable = get_config('GM_BUILDINGS', true);
	
	foreach ( $buidable as $name => $item ) {
		if ( $name != 'base-empty' ) {
			foreach ( $item as $item_name => $item_value ) {
				switch ( $item_name ) {
					//заполнение ценами улучшения
					case 'upgrade-price':
						for ( $i = 1; $i < $item['max-level']; $i++ ) {
							$upgrade_prices = $item_value($i);
							foreach ( $upgrade_prices as $price_name => $price_value ) {
								$response[$name]['upgrade-price'][$i][$price_name] = $price_value;
							}
						}
						break;
					case 'income':
						if ( $item['ifincome'] == true ) {
							for ( $i = 1; $i < $item['max-level']; $i++ ) {
								$income = $item_value($i, 1);
								foreach ( $upgrade_prices as $income_name => $income_value ) {
									$response[$name]['income'][$i][$income_name] = $income_value;
								}
							}
						}
						break;
					default:
						$response[$name][$item_name] = $item_value;
				}
			}
			//заполнение доходами
			if ( !empty($income[$name]) ) {
				$item_income = $income[$name]( 1, 1 );
				foreach ( $item_income as $key => $value ) {
					$response[$name]['income'][$key] = $value;
				}
			}
		}
	}
	
	echo json_encode( $response );
}


?>