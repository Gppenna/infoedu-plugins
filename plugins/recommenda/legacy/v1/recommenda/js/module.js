require(["exports", "jquery"], function() {
	$(document).ready(function() {
	    $('.block_recommenda #myCarousel').on('slide.bs.carousel', function (event) {
		    var slideFrom = $(this).find('.active').index()+1;
		    var slideTo = $(event.relatedTarget).index()+1;

		    var secondString = Cookies.get('secondString');
		    var thirdString = Cookies.get('thirdString');

		    var tempString = slideTo+" "+secondString+" "+($('.carousel-item').length)+" "+thirdString;
		    $("#course-count").html(tempString);
	    });
	});
});

$(document).ready(function() {
	$(".block_recommenda .coursename").dotdotdot({
		height: 90,
		fallbackToLetter: true,
		watch: true,
	});
	$(".block_recommenda .mobile-coursename").dotdotdot({
		height: 90,
		fallbackToLetter: true,
		watch: true,
	});
	$(".block_recommenda .summary-div").dotdotdot({
		height: 180,
		fallbackToLetter: true,
		watch: true,
	});
});



$(document).ready(function() {

	var divRecommenda = $('.block_recommenda');
	var divSummary = $('.block_recommenda .summary-div');
	var divName = $('.block_recommenda .coursename');
	var divNameMobile = $('.block_recommenda .mobile-coursename');
	var divImage = $('.block_recommenda .courseimage');
	var divImageIndv = $('.block_recommenda .indv_img');
	var buttonLeft = $('.bootstrapiso .carousel-control-prev');
	var buttonRight = $('.bootstrapiso .carousel-control-next');
	var courseCount = $('.block_recommenda #course-count');

	new ResizeSensor(jQuery('.block_recommenda'), function(){ 
		if(window.innerWidth > 768){
	    	if(divRecommenda.width() <= 590){
	    		divImage.css({"float":"none", "margin-top":"20px","object-fit":"cover"});
				divImageIndv.css({"width":"80%", "height":"250px","margin-left": "auto","margin-right": "auto"});
				buttonRight.css({"width":"auto","left":"auto"});
				buttonLeft.css({"width":"auto","left":"auto"});
				divSummary.hide();
				divName.hide();
				divNameMobile.css('display','flex');
				courseCount.css({"float":"none","width":"100%","text-align":"center","margin-top": "15px"});
			}
			else{
				divImage.css({"float":"left", "display":"block","left": "auto"});
				divImageIndv.css({"object-fit":"fill", "width": "300px", "height":"300px","margin-left":"25px"});
				buttonRight.css({"width":"4%","left":"97%"});
				buttonLeft.css({"width":"4%","left":"-1%"});
				divSummary.show();
				divName.css('display','flex');
				divNameMobile.hide();
				courseCount.css({"float":"right","width":"auto","text-align":"inherit","margin-top": "0"});
			}
		}
		else{
			divImage.css({"float":"none", "margin-top":"20px","object-fit":"cover"});
			divImageIndv.css({"width":"80%", "height":"250px","margin-left": "auto","margin-right": "auto"});
			buttonRight.css({"width":"auto","left":"auto"});
			buttonLeft.css({"width":"auto","left":"auto"});
			divSummary.hide();
			divName.hide();
			divNameMobile.css('display','flex');
			courseCount.css({"float":"none","width":"100%","text-align":"center","margin-top": "15px"});
		}
	});

});



