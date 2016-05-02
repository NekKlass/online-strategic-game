var tab_overview = {};

tab_overview.content = $('#tab-overview');
tab_overview.load = function ( api_address ) {
	tab_overview.resources.load(api_address);
}

tab_overview.resources = {};
tab_overview.resources.load = function( api_address ) {
	$.post(
		api_address + 'api.php',
		JSON.stringify({ 'action' : 'base_get_res' }),
		function (data){
			//parsing
			var res = JSON.parse(data)['data'];
			//saving
			tab_overview.resources.metal = res['metal'];
			tab_overview.resources.food = res['food'];
			tab_overview.resources.water = res['water'];
			//displaying
			tab_overview.content.find('#res-metal').text( tab_overview.resources.metal );
			tab_overview.content.find('#res-food').text( tab_overview.resources.food );
			tab_overview.content.find('#res-water').text( tab_overview.resources.water );
		}
	);
}