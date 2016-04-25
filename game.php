<?php


require_once 'api/core/config.php';
?>
<!DOCTYPE html>
<html>
	<head>
		<?php require_once 'import.php'; ?>
		<link rel="stylesheet" type="text/css" href="styles/game.css">
		<link rel="stylesheet" type="text/css" href="styles/chat.css">
	</head>
	<body>
		
		<div id='info-block'>
			<div id='res' >
				<button onclick='javascript:get_res()'>Обновить ресурсы</button>
				<button onclick='javascript:get_base()'>Обновить карту</button>
			</div>
		</div>
				
		<div id='map-block'>
			<div id='map-zoomer'>
				<div id='map-zoomer-in'>&#10133;</div>
				<div id='map-zoomer-out'>&#10134;</div>
			</div>
			<table id='map-base' class='map js-draggable'>
	
			</table>
			<table id='map-global' class='map js-draggable'>
	
			</table>
		</div>
			
		<div id='chat'>
			<div>
				<span id='chat-draggable'>x</span>
				<span id='chat-draggable'>_</span>
			</div>
			<div id='chat-header' draggable='true'>Чатик</div>
			<div id='chat-room-name'>Глобальная комната</div>
			<div id ='chat-messages'>
				
			</div>
			<div id ='chat-sender'>
				<input id='chat-text' type='text'></input>
				<button id='chat-send'>Отправить</button>
			</div>
		</div>
		
		<div id='side-bar' class='js-draggable-handle'>
			<div id='side-bar-head' class='draggable-handle'>Меню</div>
			<div class='collapse-content'>
				<div class='123'>
					<img width='48' height='48'src='images/base-btn.png' id='side-bar-item-base' alt='База'>
				</div>
				<div class='123'>
					<img width='48' height='48'src='images/map-btn.png' id='side-bar-item-global' alt='Карта'>
				</div>
			</div>
			<span id='side-bar-collapse' class='collapse-button'>Переключить</span>
		</div>
		
		<div id='modal-background-main' class='modal-background'>
			<div id='modal-main' class='modal-window line-fix'>
			</div>
			<div id='modal-background-confirm' class='modal-background'>
				<div id='modal-confirm' class=' modal-window modal-confirm line-fix'>
				</div>
			</div>
			<div id='modal-background-message' class='modal-background'>
				<div id='modal-message' class=' modal-window modal-message line-fix'>
				</div>
			</div>
		</div>
		
		<script src="js/jquery.js"></script>
		<script src="js/jquery-ui.js"></script>
		<script src="js/game.js"></script>
		<script src="js/draggable.js"></script>
		<script src="js/collapse.js"></script>
		<!-- <script src="//cdn.webrtc-experiment.com/RTCMultiConnection.js"></script>
		<script src="js/adapter.js"></script>
		<script src="js/chat.js"></script> -->
		
	</body>
</html>