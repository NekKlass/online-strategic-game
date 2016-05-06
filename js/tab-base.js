tab.base = {};

tab.base.content = $('#tab-base');
tab.base.load = function () {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action' : 'base_get' }),
		function (data) {
			tab.base.base = JSON.parse(data)['data'];
			tab.base.parse();
		}
	);	
}
tab.base.parse = function(){
	tab.base.content.find('.base-item:not(.base-item-build)').remove();
	$.each(
		tab.base.base,
		function( key, value ) {
			tab.base.content.prepend(
				'<div class=\'base-item\'>' +
					'<table><tr>' +
						'<td class=\'base-item-image\'>' +
							images.buildings[ value['name'] ].outerHTML +
						'</td>' +
						'<td>' +
							'<div>' + localization[ value['name'] ] + '</div>' + 
							'<div>Уровень: ' + value['level'] + '</div>' +
							'<button type=\'button\' class=\'base-act img-button\' position=\'' + key + '\'>' + 
								images.icons['upgrade'].outerHTML + 
							'</button>' +
						'</td>' +
					'</tr></table>' +
				'</div>'
			);
		}
	);
	$('.base-act').click(tab.base.upgrade);
}
tab.base.upgrade = function ( event ) {
	var position = $( event.target.parentNode ).attr('position');
	var level = tab.base.base[position]['level'];
	var name = tab.base.base[position]['name'];
	modal.prepare();
	modal.title.text('Изменить постройку');
	var str = '';
	if ( buildable[ name ]['max-level'] > level ) {
		$.each(
			buildable[ tab.base.base[position]['name'] ]['upgrade-price'][ tab.base.base[position]['level'] ],
			function ( key, value ) {
				str = str + '<div>' + localization[key] + ': ' + value + '</div>';
			}
		);
		modal.content.append(
			'<div>'+
				str +
				'<div><button class=\'base-upgrade-btn\' position=\'' + position + '\' type=\'button\'>Улучшить</button><div>' +
			'<div>'
		);
	} else {
		modal.content.append('Достигнут максимальный уровень!')
	}
	modal.show();
}
