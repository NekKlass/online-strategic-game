<?php

// ������ � ���� ������ � ����������� ������. �������� SELECT
function db_custom ( $querry, $parametres ) {
	require_once('core/config/config.php');
	$pdo = new PDO( get_config('GM_SQL_ADRESS'), get_config('GM_DB_USER'), get_config('GM_DB_PASS'), get_config('GM_SQL_OPTIONS') );
	$data = $pdo -> prepare( $querry );
	$data -> execute( $parametres );
	return $data -> fetchall( PDO::FETCH_ASSOC );
}

// ������ � ���� ������ ��� ������������ ������. ������� INSERT, SET
function db_custom_no_return ( $querry, $parametres ) {
	require_once('core/config/config.php');
	$pdo = new PDO( get_config('GM_SQL_ADRESS'), get_config('GM_DB_USER'), get_config('GM_DB_PASS'), get_config('GM_SQL_OPTIONS') );
	$data = $pdo -> prepare( $querry );
	$data -> execute( $parametres );
}


?>