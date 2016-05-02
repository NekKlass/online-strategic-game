var base, localization, buildable; //data

var loaded = false;
var block_info = $('#info-block');
var block_map = $('#map-block');
var block_res = $('#res'); 
var block_base = $('#base-content');
var block_map_global = $('#map-global');
var block_sidebar = $('#side-bar');	

var modal = $('#modal');
var modal_title = modal.find('#modal-title');
var modal_content = modal.find('#modal-content');

var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

var api_address = 'http://localhost/online-strategic-game-api/';

block_map_global.hide();

$('#tabs').tabs({
	'hide': {
		'effect': 'slide',
		'duration': 200
	},
	'show': {
		'effect': 'slide',
		'duration': 200
	}
});

$('.modal-close').click(function(event){
	$(this).parents('.modal-background').hide();
});

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

function update_buildable() {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action': 'base_get_buildable'}),
		function (data) {
			buildable = JSON.parse(data)['data'];
		}
	);
}

function modal_prepare(){
	modal_title.empty();
	modal_content.empty();
}

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
	var tabs = $('.tab')
	tabs.css('height', $('body').height() - $('#tab-control').outerHeight(true) - ( tabs.outerHeight() - tabs.height() ) );
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
		}
	);
}

function get_base( callback ) {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action' : 'base_get' }),
		function (data) {
			base = JSON.parse(data)['data'];
			block_base.find('.base-item:not(.base-item-build)').remove();
			$.each(
				base,
				function( key, value ) {
					block_base.prepend(
						'<div id=\'base-'+ key +'\' class=\'base-item\'>' +
							'<div>' + first_upper(localization[ value['name'] ]['ru']) + '</div>' + 
							'<div>Уровень: ' + value['level'] + '</div>' +
							'<button type=\'button\' id=\'base-act-' + key + '\'>Действия</button>' +
						'</div>'
					);
					$('#base-act-'+key).click(function(event){
						modal_prepare();
						modal_title.text('Изменить постройку');
						var str = '';
						$.each(
							buildable[ base[key]['name'] ]['upgrade-price'][ value['level'] ],
							function ( key, value ) {
								str = str + '<div>' + first_upper(localization[key]['ru']) + ': ' + value + '</div>';
							}
						);
						modal_content.append(
							'<div>'+
								str +
								'<div><button id=\'base-upgrade-' + key + '\' type=\'button\'>Улучшить</button><div>' +
							'<div>'
						);
						$('#base-upgrade-'+key).click(function(event){
							$.post(
								api_address + 'api.php',
								JSON.stringify({ 'action': 'base_upgrade_building', 'position': key }),
								function (data){
									var response = JSON.parse(data);
									switch( response['statusmessage'] ) {
										case 'success':
											get_base();
											$('#base-act-'+key).trigger('click');
											break;
										default:
											alert(response['statusmessage']);
											break;
									}
								}
							);
						});
						modal.parent().show();
					});
				}
			);
		}
	);	
}




