tab.base = {};

tab.base.content = $('#tab-base');
tab.base.load = function () {
    $('#base-build-btn').html( images.icons['build'].outerHTML );
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
}
tab.base.parse = function(){
    tab.base.content.find('.base-item:not(.base-item-build)').remove();
    $.each(
        tab.base.base,
        function( key, value ) {
            tab.base.content.prepend(
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
    modal.content.append(
        '<div id=\'base-build-tabs\'>' +
            '<ul id=\'base-build-list\'>' +
            '</ul>' +
        '</div>'
    );
    var tabs = $('#base-build-tabs');
    var list = tabs.find('#base-build-list');
    $.each(
        buildable,
        function ( key, value ) {
            list.append('<li><a href=\'#build-tab-' + key + '\'>' + localization[key] + '</a></li>');
            //build price
            var price = '';
            $.each(
                value['build-price'],
                function ( priceKey, priceValue ) {
                    price = price + '<div>' + localization[priceKey] + ': ' + priceValue + '</div>';
                }
            );
            var income = '';
            if ( value['ifincome'] == true ) {
                income = '<div class=\'base-build-item-info-item\'>' +
                '<div>Доход</div>';
                $.each(
                    value['income'][1],
                    function ( incomeKey, incomeValue ) {
                        income = income + '<div>' + localization[incomeKey] + ': ' + incomeValue + '</div>';
                    }
                );
                income = income + '</div>';
            }
            tabs.append(
                '<div id=\'build-tab-' + key + '\' class=\'base-build-item\'>' +
                    '<div class=\'base-build-item-info\'>' +
                        '<div class=\'base-build-item-info-item\'>' +
                            '<div>Стоимость</div>' +
                            price +
                        '</div>' +
                        income +
                    '</div>' +
                    '<div class=\'base-build-item-info\'>' +
                        '<button class=\'base-build-confirm img-button\' name=\'' + key + '\' class=\'img-button base-build-build-img-button\'>' +
                            images.icons['build'].outerHTML +
                        '</button>' +
                    '</div' +
                '</div>'
            );
        }
    );
    $('.base-build-confirm').click(function(event){
        var target = event.target;
        if ( target.localName == 'img' ) {
            var name = $( target.parentNode ).attr('name');
        } else {
            var name = $( target ).attr('name');
        }
        confirm_dlg.show(
            function(){
                $.post(
                    api_address + 'api.php',
                    JSON.stringify({ 'action': 'base_base_building', 'name': name }),
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
    modal.show();
}



