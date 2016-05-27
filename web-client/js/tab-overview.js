tab.overview = {};

tab.overview.content = $('#tab-overview');
tab.overview.load = function () {
    tab.overview.resources.load();
    var updateBtn = $('#tab-overview-resources-update');
    updateBtn.click(function(event){
        tab.overview.resources.load()
    });
    updateBtn.attr( 'src', resources_address + 'icons/refresh.png' );
}

tab.overview.resources = {};
tab.overview.resources.load = function() {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action' : 'base_get_res' }),
        function (data){
            //parsing
            tab.overview.resources.count = JSON.parse(data)['data'];
            var resBlock = tab.overview.content.find('#tab-overview-resources');
            resBlock.find('div:not(img)').remove();
            //displaying
            $.each(
                tab.overview.resources.count,
                function( key, value ) {
                    resBlock.find('img').before(
                        '<div><span locale-name=\'' + key + '\' locale-uppercase=\'true\'></span>: <span>' + value.count + '</span></div>'
                    );
                }
            );
            tab.settings.translate();
        }
    );
}
