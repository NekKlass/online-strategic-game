tab.overview = {};

tab.overview.content = $('#tab-overview');
tab.overview.load = function () {
    tab.overview.resources.load();
    $('#tab-overview-res-update').click(function(event){
        tab.overview.resources.load()
    });
    $('#tab-overview-res-update').html( images.icons['refresh'].outerHTML );
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
            tab.overview.resources.iron = res['iron'];
            tab.overview.resources.food = res['food'];
            tab.overview.resources.water = res['water'];
            //displaying
            tab.overview.content.find('#res-iron').text( tab.overview.resources.iron );
            tab.overview.content.find('#res-food').text( tab.overview.resources.food );
            tab.overview.content.find('#res-water').text( tab.overview.resources.water );
        }
    );
}