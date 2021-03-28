
/*!
 *	dotdotdot JS 4.1.0
 *
 *	dotdotdot.frebsite.nl
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	License: CC-BY-NC-4.0
 *	http://creativecommons.org/licenses/by-nc/4.0/
 */

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

require(["jquery"], function($) {
	$(document).ready(function() {
		var tempIndex = 0;
	    $('.block_recommenda #myCarousel').on('slide.bs.carousel', function (event) {
	    	var secondString = Cookies.get('secondString');
		    var thirdString = Cookies.get('thirdString');
	    	if(event.direction == 'right') {
	    		if(tempIndex == 0) {
	    			tempIndex = $('.carousel-item').length;
	    			var tempString = tempIndex+" "+secondString+" "+($('.carousel-item').length)+" "+thirdString;
		    		$("#course-count").html(tempString);
	    		}
	    		else {
	    			if(tempIndex == 1) {
	    				tempIndex = $('.carousel-item').length;
	    				var tempString = tempIndex+" "+secondString+" "+($('.carousel-item').length)+" "+thirdString;
		    			$("#course-count").html(tempString);
	    			}
	    			else {
	    				tempIndex--;
	    				var tempString = tempIndex+" "+secondString+" "+($('.carousel-item').length)+" "+thirdString;
		    			$("#course-count").html(tempString);
	    			}
	    		}
	    	}
	    	else {
	    		if(tempIndex == 0) {
	    			tempIndex = 2;
	    			var tempString = tempIndex+" "+secondString+" "+($('.carousel-item').length)+" "+thirdString;
		    		$("#course-count").html(tempString);
	    		}
	    		else {
	    			if(tempIndex == $('.carousel-item').length) {
	    				tempIndex = 1;
	    				var tempString = tempIndex+" "+secondString+" "+($('.carousel-item').length)+" "+thirdString;
		    			$("#course-count").html(tempString);
	    			}
	    			else {
	    				tempIndex++;
	    				var tempString = tempIndex+" "+secondString+" "+($('.carousel-item').length)+" "+thirdString;
		    			$("#course-count").html(tempString);
	    			}
	    		}
	    	}
	    });
	});
});

	$(document).ready(function() {

		for(var i = 1 ; i <= $('.carousel-item').length ; i++){
			var imgString = '.block_recommenda #background'+i;
			var imgElement = $(imgString);
			var imgUrl = Cookies.get(i);

			console.log(imgUrl);

			imgElement.css({'background':'url('+imgUrl+')'});
		}
	});


	$(document).ready(function() {
		$(".block_recommenda .coursename-container").dotdotdot({
			height: 70,
			fallbackToLetter: true,
			watch: true,
		});
		$(".block_recommenda .coursename-overlay").dotdotdot({
			height: 70,
			fallbackToLetter: true,
			watch: true,
		});
		$(".block_recommenda .mobile-coursename").dotdotdot({
			height: 70,
			fallbackToLetter: true,
			watch: true,
		});
		$(".block_recommenda .summary-overlay").dotdotdot({
			height: 100,
			fallbackToLetter: true,
			watch: true,
		});
	});

require(['jquery','theme_boost/carousel'], function($) {
	$(document).ready(function() {

		var itemsPerSlide = 3;
		var divRecommenda = $('.block_recommenda');

		if($('.carousel-item').length == 3) {
			if(divRecommenda.width() > 720){
				$('.block_recommenda .carousel-control-next').hide();
				$('.block_recommenda .carousel-control-prev').hide();
				$('.block_recommenda #myCarousel').carousel("pause");
				itemsPerSlide = 3;
			}
			else if(divRecommenda.width() > 529 && divRecommenda.width() <= 720){
				$('.block_recommenda .carousel-control-next').show();
				$('.block_recommenda .carousel-control-prev').show();
				itemsPerSlide = 2;
			}
			else if(divRecommenda.width() < 529){
				$('.block_recommenda .carousel-control-next').show();
				$('.block_recommenda .carousel-control-prev').show();
				itemsPerSlide = 1;
			}
		}
		if($('.carousel-item').length == 2) {
			if(divRecommenda.width() > 529){
				if($('.block_recommenda .carousel-item').hasClass('col-md-4')){
					$('.block_recommenda .carousel-item').removeClass('col-md-4');
				}
				$('.block_recommenda .carousel-control-next').hide();
				$('.block_recommenda .carousel-control-prev').hide();
				$('.block_recommenda #myCarousel').carousel("pause");
				itemsPerSlide = 2;
			}
		}

		if($('.carousel-item').length == 1) {
			$('.block_recommenda .carousel-control-next').hide();
			$('.block_recommenda .carousel-control-prev').hide();
			$('.block_recommenda #myCarousel').carousel("pause");
			if($('.block_recommenda .carousel-item').hasClass('col-md-4') && $('.block_recommenda .carousel-item').hasClass('col-sm-6')){
				$('.block_recommenda .carousel-item').removeClass('col-md-4');
				$('.block_recommenda .carousel-item').removeClass('col-sm-6');
			}
			itemsPerSlide = 1;
		}

		new ResizeSensor(jQuery('.block_recommenda'), function(){ 
			if($('.carousel-item').length == 3) {
				if(divRecommenda.width() > 720){
					$('.block_recommenda .carousel-control-next').hide();
					$('.block_recommenda .carousel-control-prev').hide();
					$('.block_recommenda #myCarousel').carousel("pause");
					itemsPerSlide = 3;
				}
				else if(divRecommenda.width() > 529 && divRecommenda.width() <= 720){
					$('.block_recommenda .carousel-control-next').show();
					$('.block_recommenda .carousel-control-prev').show();
					itemsPerSlide = 2;
				}
				else if(divRecommenda.width() < 529){
					$('.block_recommenda .carousel-control-next').show();
					$('.block_recommenda .carousel-control-prev').show();
					itemsPerSlide = 1;
				}
			}
			if($('.carousel-item').length == 2) {
				if(divRecommenda.width() > 529){
					if($('.block_recommenda .carousel-item').hasClass('col-md-4')){
						$('.block_recommenda .carousel-item').removeClass('col-md-4');
					}
					$('.block_recommenda .carousel-control-next').hide();
					$('.block_recommenda .carousel-control-prev').hide();
					$('.block_recommenda #myCarousel').carousel("pause");
					itemsPerSlide = 2;
				}
			}

			if($('.carousel-item').length == 1) {
				$('.block_recommenda .carousel-control-next').hide();
				$('.block_recommenda .carousel-control-prev').hide();
				$('.block_recommenda #myCarousel').carousel("pause");
				if($('.block_recommenda .carousel-item').hasClass('col-md-4') && $('.block_recommenda .carousel-item').hasClass('col-sm-6')){
					$('.block_recommenda .carousel-item').removeClass('col-md-4');
					$('.block_recommenda .carousel-item').removeClass('col-sm-6');
				}
				itemsPerSlide = 1;
			}
		});

		$('.block_recommenda #myCarousel').on('slide.bs.carousel', function (e) {
			    /*
		        CC 2.0 License Iatek LLC 2018
		        Attribution required
		    */

		    var $e = $(e.relatedTarget);
		    var idx = $e.index();
		    var totalItems = $('.carousel-item').length;
		    
		    if (idx >= totalItems-(itemsPerSlide-1)) {
		        var it = itemsPerSlide - (totalItems - idx);
		        for (var i=0; i<it; i++) {
		            // append slides to end
		            if (e.direction=="left") {
		                $('.carousel-item').eq(i).appendTo('.carousel-inner');
		            }
		            else {
		                $('.carousel-item').eq(0).appendTo('.carousel-inner');
		            }
		        }
		    }
	    });

	});
});

	$(document).ready(function() {
		$(".block_recommenda .courseimage").hover(function() {

			var imageId = '.block_recommenda #'+$(this).attr('id')+' > .courseimage-overlay';
			var nameId = '.block_recommenda #'+$(this).attr('id')+' > .coursename-overlay';
			var summaryId = '.block_recommenda #'+$(this).attr('id')+' > .summary-overlay';

			var imageOverlay = $(imageId);
			var nameOverlay = $(nameId);
			var summaryOverlay = $(summaryId);

			imageOverlay.css({'opacity':0, 'height':'40px'}).show().animate({'opacity':1, 'height':'250px'},300);
			nameOverlay.css({'opacity':0}).show().animate({'opacity':1},300);
			summaryOverlay.css({'opacity':0}).show().animate({'opacity':1},600);

		}, function() {
			var imageId = '.block_recommenda #'+$(this).attr('id')+' > .courseimage-overlay';
			var imageOverlay = $(imageId);

			imageOverlay.fadeOut(200,function(){ $(this).hide();});
		});
	});

require(['jquery'], function($) {
	$(document).ready(function() {
		var divRecommenda = $('.block_recommenda');

			// First execution

		if($('.carousel-item').length > 1) {
			if(divRecommenda.width() > 720 && divRecommenda.width() < 991) {
				if(!$('.block_recommenda .carousel-item').hasClass('col-md-4')){
					$('.block_recommenda .carousel-item').addClass('col-md-4');
				}
			}
			else if(divRecommenda.width() > 529 && divRecommenda.width() <= 720) {
				if($('.block_recommenda .carousel-item').hasClass('col-md-4')){
					$('.block_recommenda .carousel-item').removeClass('col-md-4');
				}
				if(!$('.block_recommenda .carousel-item').hasClass('col-sm-6')){
					$('.block_recommenda .carousel-item').addClass('col-sm-6');
				}
			}
			else if(divRecommenda.width() <= 529) {
				if($('.block_recommenda .carousel-item').hasClass('col-md-4')){
					$('.block_recommenda .carousel-item').removeClass('col-md-4');
				}
				if($('.block_recommenda .carousel-item').hasClass('col-sm-6')){
					$('.block_recommenda .carousel-item').removeClass('col-sm-6');
				}
			}
		}
     
			// Watching div resize

		new ResizeSensor(jQuery('.block_recommenda'), function(){
			if($('.carousel-item').length > 1) {
				if(divRecommenda.width() > 720 && divRecommenda.width() < 991) {
					if(!$('.block_recommenda .carousel-item').hasClass('col-md-4')){
						$('.block_recommenda .carousel-item').addClass('col-md-4');
					}
				}
				else if(divRecommenda.width() > 529 && divRecommenda.width() <= 720) {
					if($('.block_recommenda .carousel-item').hasClass('col-md-4')){
						$('.block_recommenda .carousel-item').removeClass('col-md-4');
					}
					if(!$('.block_recommenda .carousel-item').hasClass('col-sm-6')){
						$('.block_recommenda .carousel-item').addClass('col-sm-6');
					}

				}
				else if(divRecommenda.width() <= 529) {
					if($('.block_recommenda .carousel-item').hasClass('col-md-4')){
						$('.block_recommenda .carousel-item').removeClass('col-md-4');
					}
					if($('.block_recommenda .carousel-item').hasClass('col-sm-6')){
						$('.block_recommenda .carousel-item').removeClass('col-sm-6');
					}
				}
			}
		});
	});
});


