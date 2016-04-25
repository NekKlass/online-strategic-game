var collapse = $('.collapse-button'); 

collapse.click(function(){
	collapse.siblings('.collapse-content').toggle( 'blind' );
	if ( collapse.is(':hidden') == true ) {
		collapse.text(collapse.data('opened'));
	} 
	if ( collapse.is(':visible') == true ) {
		collapse.text(collapse.data('closed'));
	}	
});