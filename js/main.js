function changeBanner(slider, new_position, sliding_right){
	var transformation, track = $(slider).find('.track'), circles = $(slider).find('.circles'), left_arrow = $(slider).find('.slider-icon.left'), right_arrow = $(slider).find('.slider-icon.right'), total_banners = (track.children().size() - 1);
	if( (new_position <= total_banners) && (new_position >= 0 && total_banners >= 1) ) {
		transformation = new_position * (-100);
		track.css('-webkit-transform', 'translateX(' + transformation + '%)');
		track.css('transform','translateX(' + transformation + '%)');
		sliding_right ? left_arrow.addClass('active') : right_arrow.addClass('active');
		if (new_position >= (total_banners)) right_arrow.removeClass('active');
		if (new_position == 0) left_arrow.removeClass('active');
		circles.children().each(function(){$(this).removeClass('active');});
		circles.find('>:nth-child(' + (new_position + 1) + ')').addClass('active');
	}
}
$(function initializeSliders(){
	$('.slider').each(function(){
		var track = $(this).find('.track'), total_banners = track.children().size();
		$(this).append('<div class="slider-arrow left"><div class="slider-icon left"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></div></div><div class="slider-arrow right"><div class="slider-icon right"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></div></div>');
		if(total_banners > 1) $(this).find('.slider-icon.right').addClass('active');
		$(this).append('<div class="circles"></div>');
		var circles = $(this).find('.circles');
		for (var i = 1; i <= total_banners; i++) {circles.append('<div class="circle"></div>');}
		circles.find(">:first-child").addClass('active');
	
		$('.slider-icon').click(function(){
			if( !$(this).hasClass('active') ) return;
			var new_position, sliding_right=false, slider = $(this).closest('.slider'), track = $(slider).find('.track'), current_position = parseInt( (track.css('transform').split(',')[4] / $(slider).width()) / -1);
			if( $(this).hasClass('right') ) sliding_right = true;
			if( !Number.isInteger(current_position) ) current_position = 0;
			if(current_position > 0) {
				sliding_right ? new_position = (current_position + 1) : new_position = (current_position - 1);
				changeBanner(slider,new_position,sliding_right);
			} else {changeBanner(slider,1,true);}
		});
		circles.children().each(function(){
			$(this).click(function(){
				var sliding_right = false, slider = $(this).closest('.slider'), track = $(slider).find('.track'), current_position = parseInt( (track.css('transform').split(',')[4] / $(slider).width()) / -1), new_position = $(this).index();
				if( !Number.isInteger(current_position) ) current_position = 0;
				if (new_position > current_position) sliding_right = true;
				changeBanner(slider,new_position,sliding_right);
			});
		});
	});
});

function scrollTo(element){
	var offset = $(element).offset().top;
	$("html, body").animate({
		scrollTop: offset + "px"
	});
}
$(function initializeNavigation(){
	$('.scroll').click(function(e){
		e.preventDefault();
		var element = $(this).attr('href');
		scrollTo(element);
	});
});

/*
$(function() {
    $('#contact-form').submit(function() {
    	console.log("Submitting!");
        $.ajax({
            type: 'POST',
            url: 'email.php',
            data: { name: $(this).name.value, 
                    email: $(this).email.value,
                    enquiry: $(this).enquiry.value },
            success: function(response){  
                alert("Success! " + response);
            },
            error: function(response) { 
            	alert("Error: " + response); 
            }
        });
        return false;
    }); 
})
*/