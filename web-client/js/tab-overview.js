tab.overview = {};

tab.overview.content = $('#tab-overview');
tab.overview.load = function () {
    tab.overview.resources.load();
    $('#tab-overview-resources-update').click(function(event){
        tab.overview.resources.load()
    });
    $('#tab-overview-resources-update').html( '<img class=\'img-button\' src=\'' + resources_address + 'icons/refresh.png\'>' );
}

tab.overview.resources = {};
tab.overview.resources.load = function() {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action' : 'base_get_res' }),
        function (data){
            //parsing
            tab.overview.resources.count = JSON.parse(data)['data'];
            //displaying
            $.each(
                tab.overview.resources.count,
                function( key, value ) {
                    tab.overview.content.find('#tab-overview-resources').prepend(
                        '<div><span locale-name=\'' + key + '\' locale-uppercase=\'true\'></span>: <span>' + value.count + '</span></div>'
                    );
                }
            );
            tab.settings.translate();
        }
    );
}