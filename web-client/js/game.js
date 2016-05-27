// values
var tabs = $('.tab');
var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

$('#tabs').tabs({
    'hide': {
        'effect': 'slide',
        'duration': 200
    },
    'show': {
        'effect': 'slide',
        'duration': 200
    },
    'active': 0,
    'activate': function( event, ui){
        if ( ui.newPanel.attr('id') == tab.tech.content.parent().attr('id') ) {
            tab.tech.drawLines();
        }
    }
});

tab.overview.load();
tab.base.load();
tab.tech.load();
tab.profile.load();
tab.settings.load();
resize();

$(window).resize(function(){
    resize();
});

function resize() {
    tabs.css('height', $('body').height() - $('#tab-control').outerHeight(true) - ( tabs.outerHeight() - tabs.height() ) );
}





