var images = {};

var imageConstructor = function( path ){
    var image = new Image();
    image.src = resources_address + path;
    return image;
}

images.buildings = {};
images.buildings['miner-metal'] = imageConstructor( 'buildings/miner-metal.png' );
images.buildings['miner-food'] = imageConstructor( 'buildings/miner-food.png' );
images.buildings['miner-water'] = imageConstructor( 'buildings/miner-water.png' );

images.icons = {};
images.icons['refresh'] = imageConstructor( 'icons/refresh.png' );
images.icons['upgrade'] = imageConstructor( 'icons/upgrade.png' );