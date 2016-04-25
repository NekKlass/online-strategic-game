<?php
session_start();
$_SESSION['id'] = 0; 
header('Location: index.php');
?>
