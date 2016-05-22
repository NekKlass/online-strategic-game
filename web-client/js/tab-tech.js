tab.tech = {};

tab.tech.parsedTree = {};
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
    //parsing
    $.each(
        tab.tech.tree,
        function ( key, value ) {
            if (typeof tab.tech.parsedTree[ value.tier ] == 'undefined') {
                tab.tech.parsedTree[ value.tier ] = [];
            }
            tab.tech.parsedTree[ value.tier ][ value.branch ] = value;
        }
    );
    //drawing
    $.each(
        tab.tech.parsedTree,
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
    tab.settings.translate();
}

tab.tech.drawLines = function ( ) {
    if ( tab.tech.linesDrawn == false ) {
        $.each(
            tab.tech.parsedTree,
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
            '<div><img src=\'' + resources_address +'tech/' + tech.tier + '-' + tech.branch + '.png\'></div>' +
            '<div>' +
                '<div><span locale-name=\'tech-' + tech.tier + '-' + tech.branch + '-name\' locale-uppercase=\'true\'></span></div>' +
                '<div><span locale-name=\'tech-' + tech.tier + '-' + tech.branch + '-description\' locale-uppercase=\'true\'></span></div>' +
            '</div>' +
        '</div>'
    );
    tab.settings.translate();
    modal.show();
}

