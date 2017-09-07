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

	$('.slider').swipe({
		swipeLeft:function(){
			$(this).find('.slider-icon.right').click();
		},
		swipeRight:function(){
			$(this).find('.slider-icon.left').click();
		}
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
		if(element == '#findus') $('#findus').fadeIn();
		scrollTo(element);
	});
});

// Contact Form
$(function() {
	$('.error').hide();
	$('#contact-submit').click(function() {

		$('.error').hide();

		var name = $("#contact-name").val();
		if (name == "" || name.length > 32) {
			$("label#error_name").show();
			$("#contact-name").focus();
			return false;
		}

		var email = $("#contact-email").val();
		var email_exp = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,8}$/i;
		if (email == "" || email.length > 255 || !email_exp.test(email)) {
			$("label#error_email").show();
			$("#contact-email").focus();
			return false;
		}

		var enquiry = $("#contact-enquiry").val();
		if (enquiry == "" || name.length > 2000) {
			$("label#error_enquiry").show();
			$("#contact-enquiry").focus();
			return false;
		}

		var subject = $("#contact-subject").val();
		if (subject == "") {return false;}

		$.ajax({
			url: "https://formspree.io/hannah@glasshousebistro.uk.com", 
			method: "POST",
			data: { 'name': name, 
					'email': email,
					'enquiry': enquiry,
					'_subject': subject },
			dataType: "json",
			success: function(){
				$('#contact-wrapper').html("<p>Your form was submitted successfully.</p>");
			}
		});
		return false;
	}); 
});

// Subscribe Newsletter
$('#newsletter-form').submit(function(e) {
	$.ajax({
		type: "GET",
		url: "https://facebook.us16.list-manage2.com/subscribe/post-json?u=cbbbdafdb32ee8f96c58cd3fa&id=0d7cb4e050&c=?",
		data: $(this).serialize(),
		dataType    : 'json',
		contentType: "application/json; charset=utf-8",
		error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
		success     : function(data) {
			if (data.result != "success") {
				$('#newsletter-message').text(data.msg);
				$('#newsletter-message').addClass('error');
			} else {
				$('#newsletter-form input, #newsletter-form div').fadeOut();
				$('#newsletter-message').removeClass('error');
				$('#newsletter-message').addClass('success');
				$('#newsletter-message').text('Your subscription was successfully received. Please check your e-mail for further instructions.');
			}
		}
	});
	return false;
});

// Sticky Navigation & Hamburger Menu
$(function(){
	var sticky = false;
	$(window).scroll(function(){
		if( $(window).width() > 600 ){
			if(!sticky && ($(window).scrollTop() >= $('.flex.hero').height())){
				$('.section .navigation').addClass('sticky');
				sticky = true;
			}
			if(sticky && ($(window).scrollTop() < $('.flex.hero').height())){
				$('.section .navigation').removeClass('sticky');
				sticky = false;
			}
		} else {
			$('.section .navigation').addClass('sticky');
		}
	});
});
$(function(){
	$('#hamburger').click(function(){
		$(this).toggleClass('toggled');
		$('.section .navigation').toggleClass('expand');
	});
	$('.scroll').click(function(){
		if($(window).width() <= 600) $('.section .navigation').removeClass('expand');
		$('#hamburger').removeClass('toggled');
	});
});

// Happy Hour
$(function(){
	$('.news .slider .slider-icon').click(function(){
		var sliderpos = parseInt($(this).parent().siblings('.track').css('transform').split(',')[4] / $('.news .slider').width() / -1);
		if(sliderpos == 0 && $(this).hasClass('right')) $('#newsslide').removeClass('happyhour');
		if(sliderpos == 1 && $(this).hasClass('left')) $('#newsslide').addClass('happyhour');
	});
});

// Quandoo
$(function(){
	$('#quandoo').click(function(e){
		e.preventDefault();
		window.open(this.href, 'PrenotazionetavolisuQuandoo', 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=375,height=595'); 
		return false;
	});
});