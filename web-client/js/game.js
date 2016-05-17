var base, buildable; //data

// values
var tabs = $('.tab');
var tab_map_global = $('#map-global');

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
    'active': 0
});


tab.overview.load();
tab.base.load();
tab.tech.load();
resize();
update_buildable();

function update_buildable() {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'base_get_buildable'}),
        function (data) {
            buildable = JSON.parse(data)['data'];
        }
    );
}

$(window).resize(function(){
    resize();
});

function first_upper( str ){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function resize() {
    tabs.css('height', $('body').height() - $('#tab-control').outerHeight(true) - ( tabs.outerHeight() - tabs.height() ) );
}




