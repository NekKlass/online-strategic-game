<!DOCTYPE html>
<html>
	<head>
		<?php require_once 'import.php'; ?>
		<link rel="stylesheet" type="text/css" href="styles/registerform.css">  
	</head>
	<body>
		<form action='javascript:void(0)' method="post" class='center' onsubmit='javascript:register()'> 
			<div class='form-line'>
				<label for='uname'>Ник</label>
				<input type='text' name='uname' required >
			</div>
			<div class='form-line'>
				<label for='upass'>Пароль</label>
				<input type='password' name='upass' required >
			</div>
			<div class='form-line'>
				<label for='upassconfirm'>Подтверждение</label>
				<input type='password' name='upassconfirm' required >
			</div>
			<div class='form-line'>
				<label for='umail'>Почта</label>
				<input type='email' name='umail' required >
			</div>
			<div class='form-line'>
				<label for='umailconfirm'>Подтверждение</label>
				<input type='email' name='umailconfirm' required >
			</div>
			<div class='form-line' id='submit'>
				<input type="submit" value="Зарегестрироваться">
			</div>
			
			<div class='form-line fail' id='empty'>
				<p>Не все поля заполнены!</p>	
			</div>
			<div class='form-line fail' id='invalid-symbols'>
				<p>Недопустимые символы!</p>	
			</div>
			<div class='form-line fail' id='length'>
				<p>Недопустимая длина!</p>	
			</div>
			<div class='form-line fail' id='pass-diff'>
				<p>Пароли отличаются!</p>	
			</div>
			<div class='form-line fail' id='mail-diff'>
				<p>E-mail отличается!</p>	
			</div>
			<div class='form-line fail' id='exist'>
				<p>Пользователь уже существует!</p>	
			</div>
			
		</form>

		<div class='success' id='success'>
			<p>Успешная регистрация!</p>
			<p><a href='login.php'>Перейти на страницу входа</a></p>
		</div>
		
		<script src="js/jquery.js"></script>
		<script src="js/register.js"></script>
		
	</body>
</html>
