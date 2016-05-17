var images = {};

var imageConstructor = function( path ){
    var image = new Image();
    image.src = resources_address + path;
    return image;
}

images.buildings = {};
images.buildings['iron-mine'] = imageConstructor( 'buildings/iron-mine.png' );
images.buildings['food-farm'] = imageConstructor( 'buildings/food-farm.png' );
images.buildings['water-well'] = imageConstructor( 'buildings/water-well.png' );

images.icons = {};
images.icons['refresh'] = imageConstructor( 'icons/refresh.png' );
images.icons['upgrade'] = imageConstructor( 'icons/upgrade.png' );
images.icons['build'] = imageConstructor( 'icons/build.png' );
images.icons['yes'] = imageConstructor( 'icons/yes.png' );
images.icons['no'] = imageConstructor( 'icons/no.png' );
