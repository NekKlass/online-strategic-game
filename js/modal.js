var modal = {};

modal.block = $('#modal');

modal.title = modal.block.find('#modal-title');
modal.content = modal.block.find('#modal-content');

modal.prepare = function () {
    modal.title.empty();
    modal.content.empty();
}

modal.show = function () {
    modal.block.parent().show();
}

modal.close = function () {
    modal.block.parents('.modal-background').hide();
}

$('.modal-close').click(function(event){
    modal.close();
});

modal.block.parents('.modal-background').click(function(event){
    if ( event.target.id == 'modal-background' ){
        modal.close();
    }
});