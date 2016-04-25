<!DOCTYPE html>
<html>
	<head>
		<?php require_once 'import.php'; ?>
		<link rel="stylesheet" type="text/css" href="styles/loginform.css"> 
	</head>
	<body>
	
		<form action="javascript:void(0)" method="post" class='center' onsubmit='javascript:login()'> 
			<div class='form-line'>
				<label for='uname'>Ник</label>
				<input type='text' name='uname' id='uname' required>
			</div>
			<div class='form-line'>
				<label for='upass'>Пароль</label>
				<input type='password' name='upass' id='upass' required>
			</div>
			<div class='form-line'>			
				<label for='uremember'>Запомнить</label>
				<input type='checkbox' name='uremember'>
			</div>
			<div class='form-line' id='submit'>
				<input type="submit" value="Войти">
			</div>
			
			<div class='form-line fail' id='fail' title='Ошибка'>
				<p>Неверное имя ползователя или пароль!</p>
			</div>
			
		</form>
		
		<script src="js/jquery.js"></script>
		<script src="js/jquery-ui.js"></script>
		<script src="js/login.js"></script>
	
  </body>
</html>