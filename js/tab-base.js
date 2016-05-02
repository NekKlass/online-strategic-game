var tab_base = {};

tab_base.content = $('#tab-base');
tab_base.load = function ( api_address ) {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action' : 'base_get' }),
		function (data) {
			tab_base.base = JSON.parse(data)['data'];
			tab_base.parse();
		}
	);	
}
tab_base.parse = function(){
	tab_base.content.find('.base-item:not(.base-item-build)').remove();
	$.each(
		tab_base.base,
		function( key, value ) {
			tab_base.content.prepend(
				'<div id=\'base-'+ key +'\' class=\'base-item\'>' +
					'<div>' + localization[ value['name'] ] + '</div>' + 
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