<?php
error_reporting(E_ALL); 
require_once 'config.php';
session_start();

if ( !isset($_SESSION['id']) ) {
	$_SESSION['id'] = 0;
}	
?>
<!DOCTYPE html>
<html>
	<head>
		<?php require_once 'import.php'; ?>
	</head>
	<body>
		<header>
			<?php
			if ( $_SESSION['id'] == 0 ){
			?>
			<a href='login.php'>Вход</a>
			<a href='register.php'>Регистрация</a>
			<?php } else { ?> 
			<a href='exit.php'>Выход</a>
			<?php }?>
		</header>
	</body>
</html>