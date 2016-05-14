tab.tech = {};

tab.tech.load = function(){
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'tech_tree_get' }),
        function ( data ) {
            tab.tech.tree = JSON.parse( data )['data'];
        }
    );
};

