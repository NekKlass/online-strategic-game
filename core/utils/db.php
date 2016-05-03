<?php

// ������ � ���� ������ � ����������� ������. �������� SELECT
function db_custom ( $querry, $parametres ) {
	
	require_once('core/config/db_config.php');
	$config = get_db_conf();
	
	$pdo = new PDO( $config['adress'], $config['user'], $config['pass'], $config['options'] );
	$data = $pdo -> prepare( $querry );
	$data -> execute( $parametres );
	
	return $data -> fetchall( PDO::FETCH_ASSOC );
	
}

// ������ � ���� ������ ��� ������������ ������. ������� INSERT, SET
function db_custom_no_return ( $querry, $parametres ) {
	
	require_once('core/config/db_config.php');
	$config = get_db_conf();
	
	$pdo = new PDO( $config['adress'], $config['user'], $config['pass'], $config['options'] );
	$data = $pdo -> prepare( $querry );
	$data -> execute( $parametres );
	
}


?>