tab.tech = {};

tab.tech.parsedTree = {};
tab.tech.content = $('#tab-tech-content');

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
                        '<div class=\'tab-tech-tree-item tab-tech-tree-' + tierKey + ' tab-tech-tree-' + tierKey + '-' + key + '\'>' +
                            '<div><img class=\'tab-tech-tree-item-img\' src=\'' + resources_address +'tech/' + tierKey + '-' + key + '.png\'></div>' +
                            '<div class=\'tab-tech-tree-item-name\'><span locale-name=\'tech-' + tierKey + '-' + key + '-name\' locale-uppercase=\'true\'></span></div>' +
                        '</div>'
                    );
                    $('.tab-tech-tree-' + tierKey + '-' + key).css( 'top', key*100 + 25 );
                }
            );
            $('.tab-tech-tree-' + tierKey).css( 'left', tierKey*200 + 25 );
        }
    );
    tab.settings.translate();
}

