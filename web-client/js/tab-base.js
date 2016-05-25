tab.base = {};

tab.base.content = $('#tab-base');
tab.base.load = function () {
    $('#base-build-btn').attr( 'src', resources_address + 'icons/build.png' );
    $('#base-build-btn').unbind('click');
    $('#base-build-btn').click(tab.base.build_dlg);
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action' : 'base_get' }),
        function (data) {
            tab.base.base = JSON.parse(data)['data'];
            tab.base.parse();
        }
    );
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'base_get_buildable'}),
        function (data) {
            tab.base.buildable = JSON.parse(data)['data'];
        }
    );
}
tab.base.parse = function(){
    tab.base.content.find('.base-item:not(.base-item-build)').remove();
    $.each(
        tab.base.base,
        function( key, value ) {
            tab.base.content.find('#base-build').before(
                '<div class=\'base-item\'>' +
                        '<div class=\'base-item-image\'>' +
                            images.buildings[ value['name'] ].outerHTML +
                        '</div>' +
                        '<div class=\'base-item-content\'>' +
                            '<div class=\'base-item-head\'>' + localization[ value['name'] ] + '</div>' +
                            '<div class=\'base-item-act-block\'>' +
                                '<div>' +
                                    '<div>Уровень: ' + value['level'] + '</div>' +
                                    '<button type=\'button\' class=\'base-act img-button\' position=\'' + key + '\'>' +
                                        images.icons['upgrade'].outerHTML +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                '</div>'
            );
        }
    );
    $('.base-act').click(tab.base.upgrade_dlg);
}
tab.base.upgrade_dlg = function ( event ) {
    var target = event.target;
    if ( target.localName == 'img' ) {
        var position = $( target.parentNode ).attr('position');
    } else {
       var position = $( target ).attr('position');
    }
    var level = tab.base.base[position]['level'];
    var name = tab.base.base[position]['name'];
    modal.prepare();
    modal.title.text('Улучшить постройку');
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
                '<div><button id=\'base-upgrade-btn\' class=\' img-button\' position=\'' + position + '\' type=\'button\'>' +
                    images.icons['upgrade'].outerHTML +
                '</button><div>' +
            '<div>'
        );
        $('#base-upgrade-btn').click(tab.base.upgrade);
    } else {
        modal.content.append('Достигнут максимальный уровень!');
    }
    modal.show();
}

tab.base.upgrade = function ( event ) {
    var target = event.target;
    if ( target.localName == 'img' ) {
        var position = $( target.parentNode ).attr('position');
    } else {
       var position = $( target ).attr('position');
    }
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'base_upgrade_building', 'position': position }),
        function (data) {
            var response = JSON.parse(data);
            switch ( response['statusmessage'] ) {
                case 'success':
                    tab.base.load();
                    modal.close();
                    break;
            }
        }
    );
}

tab.base.build_dlg = function ( event ) {
    modal.prepare();
    modal.title.text('Построить');
    modal.content.append('<div id=\'tab-base-build-list\'></div>');
    var buildList = modal.content.find('#tab-base-build-list');
    $.each(
        tab.base.buildable,
        function ( key, value ) {
            buildList.append(
                '<div class=\'tab-base-build-item\'>' +
                    '<img class=\'tab-base-build-item-img\' src=\'' + resources_address + 'buildings/' + value.name + '.png\'></span>' +         
                    '<div class=\'tab-base-build-item-info\'>' +
                        '<div class=\'tab-base-build-item-title\'><span locale-name=\'building-' + value.name + '-name\' locale-uppercase=\'true\'></span></div>' +
                        '<div><span locale-name=\'building-' + value.name + '-description\' locale-uppercase=\'true\'></span></div>' +
                        '<div class=\'tab-base-build-button-wrap\'>' +
                            '<img build-name=\'' + value.name + '\' class=\'img-button\' src=\'' + resources_address + '/icons/build.png\'>' +
                            '<div id=\'tab-base-build-price-' + value.name + '\'></div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
            var priceBlock = buildList.find('#tab-base-build-price-' + value.name);
            if ( $.isEmptyObject(value.price) == true ) {
                priceBlock.append(
                    '<div>' +
                        '<span locale-name=\'client-tab-base-build-price\' locale-uppercase=\'true\'></span>: ' +
                        '<span locale-name=\'client-tab-base-build-price-free\' locale-uppercase=\'false\'></span>' +
                    '</div>'
                );
            } else {
                priceBlock.append('<div><span locale-name=\'client-tab-base-build-price\' locale-uppercase=\'true\'></span></div>');
                $.each(
                    value.price,
                    function ( priceKey, priceValue ) {
                        priceBlock.append('<div><span locale-name=\'' + priceKey + '-name\' locale-uppercase=\'true\'>: ' + priceValue +'</div>');
                    }
                );
            }
        }
    );
    //выполняем действия
    buildList.find('.img-button').click(function(event){
        var target = event.target;
        var name = $( target ).attr('build-name');
        confirm_dlg.show(
            function(){
                $.post(
                    api_address + 'api.php',
                    JSON.stringify({ 'action': 'base_build_building', 'name': name }),
                    function (data) {
                        alert(data);
                    }
                );
                modal.close();
            },
            function(){}
        );
    });
    tabs.tabs();
    tab.settings.translate();
    modal.show();
}



