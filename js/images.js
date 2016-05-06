var images = {};

var imageConstructor = function( path ){
	var image = new Image();
	image.src = resources_address + path;
	return image;
}

images['miner-metal'] = imageConstructor( 'buildings/miner-metal.png' );
images['miner-food'] = imageConstructor( 'buildings/miner-food.png' );
images['miner-water'] = imageConstructor( 'buildings/miner-water.png' );