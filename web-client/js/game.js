// values
var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;

$('#tabs').children('div:not(:first)').hide();
$('#tabs').children('#tab-control').children('li').click(function ( event ) {
    if ( event.target.tagName == 'SPAN' ) {
        var target = $( event.target ).parent();
    } else {
        var target = $( event.target );
    }
    $('#tabs').children('div').hide();
    $('#tabs').children('#tab-control').children('li').removeClass( 'tab-active' );
    $('#tabs').children( '#' + target.attr('href') ).css( 'display', 'flex' );
    target.addClass( 'tab-active' );
});

tab.overview.load();
tab.base.load();
tab.tech.load();
tab.profile.load();
tab.settings.load();





