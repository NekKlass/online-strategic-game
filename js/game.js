var base, localization, buildable; //data

var loaded = false;
var block_info = $('#info-block');
var block_map = $('#map-block');
var block_res = $('#res'); 
var block_base = $('#base-content');
var block_map_global = $('#map-global');
var block_sidebar = $('#side-bar');	
var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

var api_address = 'http://localhost/online-strategic-game-api/';

block_map_global.hide();

$('#tabs').tabs();

$.post(
	api_address + 'api.php',
	JSON.stringify({ 'action' : 'sys_get_localization'}),
	function ( data ) {
		localization = JSON.parse(data)['data'];
		get_res();
		get_base();
		resize();
		update_buildable();
		loaded = true;
	}
);

$(window).resize(function(){
	resize();
});

$('#side-bar-item-base').click(function(){
	block_map_global.hide();
	block_map_base.show();	
});

$('#side-bar-item-global').click(function(){
	block_map_global.show();
	block_map_base.hide();	
});

function first_upper( str ){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function resize() {
	$('.tab').css('height', $('body').height() - $('#tab-control').outerHeight() );
}

function get_res( callback ) {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action' : 'base_get_res' }),
		function (data){
			if (data == 'nologin')
				window.location.href = 'login.php';
			var res = JSON.parse(data)['data'];
			$('#res-metal').text(res['metal']);
			$('#res-food').text(res['food']);
			$('#res-water').text(res['water']);
			resize();
			if ( callback) {
				callback();
			}
		}
	);
}

function get_base( callback ) {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action' : 'base_get' }),
		function (data) {
			base = JSON.parse(data)['data'];
			$.each(
				base,
				function( key, value ) {
					block_base.append(
						'<div id=\'base-'+ key +'\' class=\'base-item\'>' +
							'<div>' + first_upper(localization[ value['name'] ]['ru']) + '</div>' + 
							'<button type=\'button\' id=\'base-act-' + key + '\'>Действия</button>' +
						'</div>'
					);
				}
			);
		}
	);	
}

function base_modal(x,y){
	var modal = $('#modal-main');
	modal.empty();
	modal.append("<span id='-main' class=' hover-button' >&#10060;</span>");
	modal.children('#-main').click(function(){
		$(this).parent().parent().hide();
	});
	if ( base['map'][x][y]['name'] == 'base-empty' ) {
		$.each(
			buildable,
			function ( key, value ){
				var str;
				str =       '<div class=\'upgrade-block\'>';
				str = str + '<div class=\'upgrade-title\'>'+ first_upper(localization[key]['ru']) + '</div>';
				$.each(
					value['build-price'],
					function ( key_item, value_item ){
						str = str + '<div>' + 'Цена: ' + value_item + ' ' + localization[key_item]['ru'] + '</div>';
					}
				);
				$.each(
					value['income'][1],
					function ( key_item, value_item ) {
						str = str + '<div>' + 'Доход: ' + value_item + ' '+ localization[key_item]['ru'] + ' в сек' + '</div>';
					}
				);
				str = str + "<button onclick=\"javascript:build_base(" + x + ',' + y + "," + "'" + key +"'" + ")\">Построить</button>";
				str = str + '</div>';
				modal.append(str);
			}
		);
	} else {
		var str = '';
		str = str + '<div class=\'base-uild-title\'>' + first_upper(localization[base['map'][x][y]['name']]['ru']) + '</div>';
		//уровень
		if ( buildable[base['map'][x][y]['name']]['upgradable'] == true ) {
			str = str + '<div class=\'base-building-info-block confirm-yes\'>'
			str = str + '<div>Уровень: ' + base['map'][x][y]['level'] + '</div>';
			str = str + "<button onclick='javascript:upgrade_base(" + x + ',' + y + ")'>Улучшить</button>";
			str = str + '</div>';
		}
		//уничтожить
		str = str + '<div class=\'base-building-info-block confirm-no \'>';
		str = str + "<button onclick=\'javascript:base_destroy(" + x + ',' + y + ")'>Унитожить</button>";
		str = str + '</div>';
		modal.append(str);
	}
	modal.parent().show();
}

function upgrade_base(x,y) {
	var modal2 = $('#modal-confirm');
	modal2.empty();
	modal2.append("<span id='modal-confirm' class=' hover-button' >&#10060;</span>");
	modal2.append("<span align='center'>Вы уверены?</span><br>");
	modal2.append("<button id='modal-confirm-no' class='modal-confirm-btn confirm-no'>Нет</button>");
	modal2.append("<button id='modal-confirm-yes' class='modal-confirm-btn confirm-yes'>Да</button>");
	modal2.children('#modal-confirm').click(function(){
		$(this).parent().parent().hide();
	});
	modal2.children('#modal-confirm-no').click(function(){
		$(this).parent().parent().hide();
	});
	modal2.children('#modal-confirm-yes').click(function(){
		$.post( 'game.php', { 'action' : 'get_res' } );
		$.post(
			'game.php',
			{ 'action' : 'base_upgrade', 'x' : x, 'y' : y},
			function (data) {
				modal2.parent().hide();
				switch (data){
					case 'success':
						get_base();
						base['map'][x][y]['level']++;
						get_res();
						base_modal(x,y);
						notify('Успешно улучшено!');
						break;
					case 'low_metal':
						notify('Недостаточно металла!');
						break;
					case 'max':
						notify('Достигнут максимальный уровень!');
						break;
					default:
						alert(data);
				}
			}
		);
	});
	modal2.parent().show();
}

function notify(message) {
	var message_wnd = $('#modal-message');
	message_wnd.empty();
	message_wnd.append("<span id='close-message-confirm' class=' hover-button' >&#10060;</span>");
	message_wnd.append(message);
	message_wnd.append("<br><button id='modal-message-close'>Ок</button>");
	message_wnd.children('#close-message-confirm').click(function(){
		$(this).parent().parent().hide();
	});
	message_wnd.children('#modal-message-close').click(function(){
		$(this).parent().parent().hide();
	});
	message_wnd.parent().show();
	message_wnd.parent().parent().show();
}

function update_buildable() {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action': 'base_get_buildable'}),
		function (data) {
			buildable = JSON.parse(data);
		}
	);
}

function build_base (x ,y, name) {
	get_res();
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action': 'base_build', 'x': x, 'y': y, 'what': name }),
		function (data) {
			switch (data) {
				case 'success':
					get_base(
						function () {
							get_res( 
								function() {
									base_modal(x, y);
									notify('Успех!');
								}
							);
						}
					);
					break;
				case 'not-enough':
					notify('Недостаточно средств!');
					break;
				default:
					alert(data);
			}
		}
	);
}

function base_destroy( x, y ) {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action': 'base_destroy', 'x': x, 'y': y }),
		function (data) {
			switch (data) {
				case 'success':
					get_base(
						function () {
							get_res( 
								function() {
									base_modal(x, y);
									notify('Успех!');
								}
							);
						}
					);
					break;
				default:
					alert(data);
			}
		}
	);
}




