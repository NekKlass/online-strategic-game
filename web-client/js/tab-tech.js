tab.tech = {};

localization['client-tab-tech'] = {
    'ru': 'Исследования',
    'en': 'tech'
}
localization['client-tech-learn'] = {
    'ru': 'Изучить',
    'en': 'Learn'
}
localization['client-tech-learned-already'] = {
    'ru': 'Уже изучено!',
    'en': 'Already learned'
}

tab.tech.content = $('#tab-tech-content');
tab.tech.linesDrawn = false;

tab.tech.load = function(){
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'tech_tree_get' }),
        function ( data ) {
            tab.tech.tree = JSON.parse( data )['data'];
            tab.tech.draw();
        }
    );
};

tab.tech.draw = function () {
    //drawing
    $.each(
        tab.tech.tree,
        function ( tierKey, tierValue ) {
            $.each(
                tierValue,
                function ( key, value ) {
                    tab.tech.content.append(
                        '<div class=\'tab-tech-tree-item tab-tech-tree-' + tierKey + '\' id=\'tab-tech-tree-' + tierKey + '-' + key + '\'>' +
                            '<div><img class=\'tab-tech-tree-item-img\' src=\'' + resources_address +'tech/' + tierKey + '-' + key + '.png\'></div>' +
                            '<div class=\'tab-tech-tree-item-name\'><span locale-name=\'tech-' + tierKey + '-' + key + '-name\' locale-uppercase=\'true\'></span></div>' +
                        '</div>'
                    );
                    tab.tech.content.find('#tab-tech-tree-' + tierKey + '-' + key).css( 'top', key*100 + 25 );
                    tab.tech.tree[tierKey][key].tier = tierKey;
                    tab.tech.tree[tierKey][key].branch = key;
                    tab.tech.content.find('#tab-tech-tree-' + tierKey + '-' + key).click(
                        function ( event ) {
                            tab.tech.explore(value);
                        }
                    );
                }
            );
            tab.tech.content.find('.tab-tech-tree-' + tierKey).css( 'left', tierKey*270 + 25 );
        }
    );
    //painting green learned
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'tech_get' }),
        function ( data ) {
            tab.tech.learned = JSON.parse(data)['data'];
            $.each(
                tab.tech.learned,
                function (tierKey, tierValue){
                    $.each(
                        tierValue,
                        function( branchKey, branchValue ) {
                            if ( Boolean(branchValue.learned) == true ) {
                                var item = tab.tech.content.find('#tab-tech-tree-' + tierKey + '-' + branchKey);
                                item.find('*').css( 'border-color', 'green');
                            }
                        }
                    )
                }
            );
        }
    );
    tab.settings.translate();
}

tab.tech.drawLines = function ( ) {
    if ( tab.tech.linesDrawn == false ) {
        $.each(
            tab.tech.tree,
            function ( tierKey, tierValue ) {
                $.each(
                    tierValue,
                    function ( itemKey, itemValue ) {
                        if ( itemValue.require.length > 0 ) {
                            $.each(
                                itemValue.require,
                                function ( key, value ) {
                                    var elem = tab.tech.content.find('#tab-tech-tree-' + tierKey + '-' + itemKey);
                                    var elemTo = tab.tech.content.find('#tab-tech-tree-' + key + '-' + value);
                                    tab.tech.content.line(
                                        elem.position()['left'] + 1,
                                        elem.position()['top'] + elem.height()/2 + 1,
                                        elemTo.position()['left'] + elemTo.width(),
                                        elemTo.position()['top'] + elemTo.height()/2,
                                        { 'stroke': 2, 'zindex': 0 }
                                    );
                                }
                            );
                        }
                    }
                );
            }
        );
        tab.tech.linesDrawn = true;
    }
}

tab.tech.explore = function ( tech ) {
    modal.prepare();
    modal.title.html('<span locale-name=\'client-tech-learn\' locale-uppercase=\'true\'></span>');
    modal.content.append(
        '<div class=\'tab-tech-modal-wrap\'>' +
            '<div class=\'tab-tech-modal-img\'><img src=\'' + resources_address +'tech/' + tech.tier + '-' + tech.branch + '.png\'></div>' +
            '<div>' +
                '<div><span locale-name=\'tech-' + tech.tier + '-' + tech.branch + '-name\' locale-uppercase=\'true\'></span></div>' +
                '<div><span locale-name=\'tech-' + tech.tier + '-' + tech.branch + '-description\' locale-uppercase=\'true\'></span></div>' +
                '<div class=\'tab-tech-modal-learn-main\'><div class=\'tab-tech-modal-learn-wrap\'>' +
                    '<div><img class=\'img-button\' src=\'' + resources_address + 'icons/learn.png\'></div>' +
                    '<div id=\'tab-tech-modal-prices\'></div>' +
                '</div></div>' +
            '</div>' +
        '</div>'
    );
    var prices = modal.content.find('#tab-tech-modal-prices');
    $.each(
        tech.price,
        function ( key, value ) {
             prices.append('<div><span locale-name=\'' + key + '\' locale-uppercase=\'true\'></span>: ' + value + '</div>');
        }
    );
    if ( (tab.tech.learned[tech.tier] == undefined) ) {
        tab.tech.learned[tech.tier] = {};
    }
    if ( (tab.tech.learned[tech.tier][tech.branch] == undefined) ) {
        tab.tech.learned[tech.tier][tech.branch] = {};
    }
    if ( (tab.tech.learned[tech.tier][tech.branch].learned == undefined) ) {
        tab.tech.learned[tech.tier][tech.branch].learned = false;
    }
    if ( Boolean(tab.tech.learned[tech.tier][tech.branch].learned) == true ) {
        modal.content.find('.tab-tech-modal-learn-wrap').html(
            '<div><span locale-name=\'client-tech-learned-already\' locale-uppercase=\'true\'></span></div>'
        );
    }
    modal.content.find('.img-button').click(function ( event ){
        confirm_dlg.show(
            function(){
                $.post(
                    api_address + 'api.php',
                    JSON.stringify({ 'action': 'tech_learn', 'tier': tech.tier, 'branch': tech.branch }),
                    function (data) {
                        if ( JSON.parse(data)['status'] == 'success' ) {
                            tab.tech.content.empty();
                            tab.tech.draw();
                            tab.tech.linesDrawn = false;
                            tab.tech.drawLines();
                        }
                    }
                );
                modal.close();
            },
            function(){}
        );
    });
    tab.settings.translate();
    modal.show();
}
