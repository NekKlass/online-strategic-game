tab.settings = {};

tab.settings.load = function () {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'sys_get_localization' }),
        function ( data ){
            $.each(
                JSON.parse( data )['data'],
                function ( key, value ) {
                    localization[ key ] = value;
                    }
            );
            tab.settings.translate();
        }
    );
}

//***********************
//   все для перевода
//***********************
tab.settings.langswitcher = $('#tab-settings-lang-selector');

tab.settings.langswitcher.change(
    function ( event ) {
        tab.settings.translate( tab.settings.langswitcher.val() );
    }
);

tab.settings.translate = function ( lang ) {
    if ( lang == undefined ) {
        var lang = tab.settings.langswitcher.val();
    }
    var unlocalized = $('span[locale-name]');
    $.each(
        unlocalized,
        function ( key, value) {
            var elem = $( value );
            if ( localization[ elem.attr('locale-name') ] == undefined ) {
                elem.text( '~~~[UNDEFINED=]~~~' );
            } else if ( localization[ elem.attr('locale-name') ][ lang ] == undefined ) {
                elem.text( '~~~[UNDEFINED=]~~~' );
            } else if ( elem.attr('locale-uppercase') == 'true' ) {
                elem.text( localization[ elem.attr('locale-name') ][ lang ].upperCase() );
            } else {
                elem.text( localization[ elem.attr('locale-name') ][ lang ].lowerCase() );
            }
        }
    );
}