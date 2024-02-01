 $(document).ready(function() { //ready open
							
							
        // Add minus icon for collapse element which is open by default
        $(".collapse.in").each(function(){
        	$(this).siblings(".panel-heading").find(".more-less").addClass("fa-minus").removeClass("fa-plus");
        });
        
        // Toggle plus minus icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function(){
        	$(this).parent().find(".more-less").removeClass("fa-plus").addClass("fa-minus");
        }).on('hide.bs.collapse', function(){
        	$(this).parent().find(".more-less").removeClass("fa-minus").addClass("fa-plus");
        });
   
							
	/*tab js	*/	
	
	 $('.sliding_form_icon').click(function() {
	$('.sliding_form').addClass('open');
  });
  $('.sliding_form_box .close_btn').click(function() {
	$('.sliding_form').removeClass('open');
  });
  
  
  
  
  $('.q_form_icon').click(function() {
$('.q_form').addClass('open');
 });
 $('.q_form_box .close_btn_q').click(function() {
	$('.q_form').removeClass('open');
 });	
							
							
	//serch on page
	
	$('.search_icon a').on("click", function(){		
		$('.search_box').addClass('open');
		$('body').addClass('noScroll');
	});
	$('.search_icon .search_box .close_btn').on("click", function(){		
		$('.search_box').removeClass('open');
		$('body').removeClass('noScroll');
	});				
			
						

$(".notific-slide").owlCarousel({
     
          navigation : false, // Show next and prev buttons
          slideSpeed : 300,
          paginationSpeed : 1000,
		  pagination:false,
		  autoplay:true,
		  autoPlay: 6000,
          singleItem:true
     
      });
$(".owl-seminor").owlCarousel({
     
          navigation : false, // Show next and prev buttons
          slideSpeed : 300,
          paginationSpeed : 1000,
		  pagination:false,
		  autoplay:true,
		  autoPlay: 6000,
          singleItem:true
     
      });


$(function(){
  $('#demo').on('hide.bs.collapse', function () {
    $('#button').html('<span class="glyphicon glyphicon-collapse-down"></span> Show');
  })
  $('#demo').on('show.bs.collapse', function () {
    $('#button').html('<span class="glyphicon glyphicon-collapse-up"></span> Hide');
  })
})

//owl-story banner
  var owl = $('.owl-story.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
	  
      margin:0,
	  autoplayTimeout:5000,
      navSpeed:100,
      nav:true,
	  autoplay:true,
	 dots: false,
	autoplayHoverPause:true,

	   // autoWidth:true,
	  
//dotsData: true,
    responsive:{
        0:{
            items:2,
            nav:true,
			 margin:5,
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        },
		1900:{
            items:1,
            nav:true,
            loop:true,
			//autoWidth:true
        }
    }
	  
  });
  
  
  //owl-story banner
  var owl = $('.owl-story1.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
	   autoplayTimeout:5000, 
      margin:0,
      navSpeed:500,
      nav:true,
	  autoplay:true,
	  autoplayHoverPause:true,
	 dots: false,
	   // autoWidth:true,
	  
//dotsData: true,
    responsive:{
        0:{
            items:2,
            nav:true,
			 margin:5,
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        },
		1900:{
            items:1,
            nav:true,
            loop:true,
			//autoWidth:true
        }
    }
	  
  });
  
  
   //owl-story banner
  var owl = $('.owl-story2.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
      margin:0,
	   autoplayTimeout:4000,
      navSpeed:500,
      nav:true,
	  autoplay:true,
	 dots: false,
	 autoplayHoverPause:true,
	   // autoWidth:true,
	  
//dotsData: true,
    responsive:{
        0:{
            items:2,
            nav:true,
			 margin:5,
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        },
		1900:{
            items:1,
            nav:true,
            loop:true,
			//autoWidth:true
        }
    }
	  
  });
  
  
  
   //owl-story banner
  var owl = $('.owl-story3.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:false,
      margin:0,
	   autoplayTimeout:4000,
      navSpeed:500,
      nav:true,
	  autoplay:true,
	 dots: false,
	 autoplayHoverPause:true,
	   // autoWidth:true,
	  
//dotsData: true,
    responsive:{
        0:{
            items:2,
            nav:true,
			 margin:5,
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        },
		1900:{
            items:1,
            nav:true,
            loop:true,
			//autoWidth:true
        }
    }
	  
  });
  
  
  
  
  
  
  
  
  //owl-story banner
  var owl = $('.owl-alumni.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
      margin:0,
      navSpeed:400,
      nav:true,
	  autoplay:true,
	 dots: false,
	  singleItem:true,
	  // autoWidth:true,
	    responsiveClass:true,
		//slideBy:2,
	  
//dotsData: true,
     //items:4
	  
    responsive:{
        0:{
            items:2,
            nav:true,
			 margin:5,
        },
        600:{
            items:2,
            nav:false
        },
        1366:{
            items:4,
            nav:true,
            loop:false
        },
		
		  1280:{
            items:3,
            nav:true,
            loop:false
        },
		
		  1024:{
            items:2,
            nav:true,
            loop:false
        },
		1900:{
            //items:3,
            nav:true,
            loop:false,
			//autoWidth:true
        }
    }
	  
	  
  });
  
  
 
  
   // alumni slider
  var owl = $('.owl-video');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
      margin:0,
      navSpeed:500,
      nav:true,
	  autoplay:true,
	  autoPlay:3000,
	 dots: false,
	  singleItem:true,
	  
	  // autoWidth:true,
	    responsiveClass:true,
		//slideBy:2,
	  
//dotsData: true,
     //items:4
	  
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:true
        },
        1000:{
            items:4,
            nav:true,
            loop:true
        }
    }
	  
  });
  
  //owl-story banner
  var owl = $('.banner .owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
      margin:0,
      navSpeed:500,
      nav:true,
	  autoplay:true,
	 dots: true,
   // autoWidth:true,
	   
	  
//dotsData: true,
      items:1
	  
	  
  });
  
  //owl-story banner
  var owl = $('.notification-sec .owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
      margin:0,
      navSpeed:500,
      nav:true,
	  autoplay:true,
	 dots: false,
   // autoWidth:true,
	   
	  
//dotsData: true,
      items:1
	  
	  
  });
 
 
 
 //owl-story notification-sec home page
  var owl = $('.owl-iedetail.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:false,
      margin:10,
      navSpeed:500,
      nav:false,
	  autoplay:true,
	 dots: false,
	   responsiveClass:true,
	    //autoWidth:true,
	   
	  
//dotsData: true,
      items:4
	  
  });
  
 
//owl-story notification-sec home page
  var owl = $('.owl-topper.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:false,
      margin:0,
      navSpeed:500,
      nav:false,
	  autoplay:true,
	 dots: false,
	  // responsiveClass:true,
	    //autoWidth:true,
	   
	  
//dotsData: true,
      items:6,
	  responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }
	  
  });
  
     



// mega menu drop down icon

jQuery('.dropdown').hover(function() {
              jQuery(this).find('.dropdown-menu').stop(true, true).delay(300).slideDown(300);
           }, function() {
             jQuery(this).find('.dropdown-menu').stop(true, true).delay(300).slideUp(300);
           });


	
	$('.login').click(function(){
  $('#slideout').toggleClass('on');
});
	
//social js icon	
					   
		$(".socil_links").click(function(){
        $("#open_facegate").toggle();
	    });
		
		$(".share").click(function(){
        $(".cs-social-share").toggle();
	    });


$('body').click(function(e) {
    var target = $(e.target);
    if(target.is('#facegate_tab')) {
    }else{
      $('.facegate_tab').css('display','none ')
    }
});


// striky header

$(window).scroll(function () {
				if ($(this).scrollTop() > 2) {
					$('.ese').addClass("sticky");	
				}
			else {
					$('.ese').removeClass("sticky");				}
			
			});	

$(window).scroll(function () {
				if ($(this).scrollTop() > 2) {
					$('.achivement .nav-tabs').addClass("sticky");	
				}
			else {
					$('.achivement .nav-tabs').removeClass("sticky");				}
			
			});	

$(window).scroll(function () {
				if ($(this).scrollTop() > 2) {
					$('.branch-dis').addClass("sticky");	
				}
			else {
					$('.branch-dis').removeClass("sticky");				}
			
			});	



/*******************************
* ACCORDION WITH TOGGLE ICONS
*******************************/
  // function toggleIcon(e) {
  //       $(e.target)
  //           .prev('.panel-heading')
  //           .find(".more-less")
  //           .toggleClass('fa-plus fa-minus');
  //   }
  //   $('.panel-group').on('hidden.bs.collapse', toggleIcon);
   // $('.panel-group').on('shown.bs.collapse', toggleIcon);




   $('.collapsed').click(function(){
      $(this).children().toggleClass('fa-plus fa-minus')
	    $(this).toggleClass('collapsed')
		
    })
	// on click of first second is close   
$('.panel-collapse').on('show.bs.collapse', function (e) {
  $(e.target).closest('.panel').siblings().find('.panel-collapse').collapse('hide');
});
   
   
	
//if mask is clicked
	$('#page').click(function () {
	
		//$('.on').off();
		 $("#slideout").removeClass("on");
		 
		
	});
		
	
	
	
	//pop up js first
	// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
	
//pop up js	 first end



//pop up js second
	// Get the modal
var modal2 = document.getElementById('myModal');

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn2");


// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}
	
//pop up js	 first second

//pop up js third
	// Get the modal
var modal3 = document.getElementById('myModalnew');

// Get the button that opens the modal
var btn3 = document.getElementById("myBtn3");


// Get the <span> element that closes the modal
var span3 = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn3.onclick = function() {

    modal3.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span3.onclick = function() {

    modal3.style.display = "none";
    
}




// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
        
    }
}
	
//pop up js	 first second
	
	
	
	
	//smooth scroll
	 $('a.smooth-scroll[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});



  }); 


//onload popup 
	 $(document).ready(function(){
		$(".home-popup #myModal").modal('show');
	  //$(".mega-menu .main-hover ul li:first-child").addClass("active-menu");
	});
	
	  $(document).ready(function(){
		$(".mob-popup #myModal").modal('hide');
	 
	});
	

var winWdth = $(window).width();
	//alert(winWdth);
	if(winWdth < 768){


 $(document).ready(function(){
		$(".mob-popup #myModal").modal('show');
	
	});
 }



 

$(document).ready(function () {
          if (!$.browser.webkit) {
              $('.wrapper').html('<p>Sorry! Non webkit users. :(</p>');
          }
		  
		  
		

      });
	  
 






//owl-story banner
  var owl = $('.owl-centre-banner.owl-carousel');

  // Carousel initialization
  owl.owlCarousel({
      loop:true,
	  
      margin:0,
	  autoplayTimeout:5000,
      navSpeed:100,
      nav:false,
	  autoplay:true,
	 dots: true,
	autoplayHoverPause:true,

	   // autoWidth:true,
	  
//dotsData: true,
    responsive:{
        0:{
            items:1,
           
			 margin:5,
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
          
            loop:true
        },
		1900:{
            items:1,
         
            loop:true,
			//autoWidth:true
        }
    }
	  
  });
  
  

$('.sec1 ul.nav-tabs li a').click(function() {
    $('.sec1 ul.nav-tabs li a.reference1').removeClass('reference1');
    $(this).addClass('reference1');
});



















//js for top scroll


	
								 
								 
 $(document).ready( function() {
							 
							 
$(function(){
$(".wrapper1").scroll(function(){
$(".wrapper2")
  .scrollLeft($(".wrapper1").scrollLeft());
});
$(".wrapper2").scroll(function(){
$(".wrapper1")
  .scrollLeft($(".wrapper2").scrollLeft());
});
});
	
 
 
 
 
   
	
$(function(){
$(".wrapper3").scroll(function(){
$(".wrapper4")
	.scrollLeft($(".wrapper3").scrollLeft());
});
$(".wrapper4").scroll(function(){
$(".wrapper3")
	.scrollLeft($(".wrapper4").scrollLeft());
});
});
	
	 
	 
	 
	 
	 
	 
	 
   
	
$(function(){
$(".wrapper5").scroll(function(){
$(".wrapper6")
	.scrollLeft($(".wrapper5").scrollLeft());
});
$(".wrapper6").scroll(function(){
$(".wrapper5")
	.scrollLeft($(".wrapper6").scrollLeft());
});
});
	
	 
	 
	 
	 
  
	
$(function(){
$(".wrapper7").scroll(function(){
$(".wrapper8")
	.scrollLeft($(".wrapper7").scrollLeft());
});
$(".wrapper8").scroll(function(){
$(".wrapper7")
	.scrollLeft($(".wrapper8").scrollLeft());
});
});



	
	
	//second acc
	
$(function(){
$(".wrapper9").scroll(function(){
$(".wrapper10")
.scrollLeft($(".wrapper9").scrollLeft());
});
$(".wrapper10").scroll(function(){
$(".wrapper9")
  .scrollLeft($(".wrapper10").scrollLeft());
});
});
	
	
	
$(function(){
$(".wrapper11").scroll(function(){
$(".wrapper12")
.scrollLeft($(".wrapper11").scrollLeft());
});
$(".wrapper12").scroll(function(){
$(".wrapper11")
.scrollLeft($(".wrapper12").scrollLeft());
});
});


		
$(function(){
$(".wrapper13").scroll(function(){
$(".wrapper14")
.scrollLeft($(".wrapper13").scrollLeft());
});
$(".wrapper14").scroll(function(){
$(".wrapper13")
.scrollLeft($(".wrapper14").scrollLeft());
});
});
	



$(function(){
$(".wrapper15").scroll(function(){
$(".wrapper16")
.scrollLeft($(".wrapper15").scrollLeft());
});
$(".wrapper16").scroll(function(){
$(".wrapper15")
.scrollLeft($(".wrapper16").scrollLeft());
});
});
	
	
	
	
	
});		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
   







