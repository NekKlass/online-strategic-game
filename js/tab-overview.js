tab.overview = {};

tab.overview.content = $('#tab-overview');
tab.overview.load = function ( api_address ) {
	tab.overview.resources.load(api_address);
}

tab.overview.resources = {};
tab.overview.resources.load = function( api_address ) {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action' : 'base_get_res' }),
		function (data){
			//parsing
			var res = JSON.parse(data)['data'];
			//saving
			tab.overview.resources.metal = res['metal'];
			tab.overview.resources.food = res['food'];
			tab.overview.resources.water = res['water'];
			//displaying
			tab.overview.content.find('#res-metal').text( tab.overview.resources.metal );
			tab.overview.content.find('#res-food').text( tab.overview.resources.food );
			tab.overview.content.find('#res-water').text( tab.overview.resources.water );
		}
	);
}