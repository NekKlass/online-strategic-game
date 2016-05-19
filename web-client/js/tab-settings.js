String.prototype.upperCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.lowerCase = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

tab.settings = {};

tab.settings.load = function () {
    tab.settings.translate();
}

//***********************
//   unlocalization stuff
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