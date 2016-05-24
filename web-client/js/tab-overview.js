tab.overview = {};

tab.overview.content = $('#tab-overview');
tab.overview.load = function () {
    tab.overview.resources.load();
    $('#tab-overview-res-update').click(function(event){
        tab.overview.resources.load()
    });
    $('#tab-overview-res-update').html( '<img class=\'img-button\' src=\'' + resources_address + 'icons/refresh.png\'>' );
}

tab.overview.resources = {};
tab.overview.resources.load = function() {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action' : 'base_get_res' }),
        function (data){
            //parsing
            var res = JSON.parse(data)['data'];
            //saving
            tab.overview.resources = res;
            //displaying
            $.each(
                tab.overview.resources,
                function( key, value ) {
                    tab.overview.content.find('#res').prepend(
                        '<div><span locale-name=\'' + key + '\' locale-uppercase=\'true\'></span>: <span>' + value.count + '</span></div>'
                    );
                }
            );
            tab.settings.translate();
        }
    );
}