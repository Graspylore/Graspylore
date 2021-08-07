;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};

	var burgerMenu = function() {

		$('.js-fh5co-nav-toggle').on('click', function(event) {
			event.preventDefault();
			var $this = $(this);
			if( $('body').hasClass('menu-show') ) {
				$('body').removeClass('menu-show');
				$('#fh5co-main-nav > .js-fh5co-nav-toggle').removeClass('show');
			} else {
				$('body').addClass('menu-show');
				setTimeout(function(){
					$('#fh5co-main-nav > .js-fh5co-nav-toggle').addClass('show');
				}, 900);
			}
		})
	};

	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var counter = function() {
		$('.js-counter').countTo({
			formatter: function (value, options) {
	      	return value.toFixed(options.decimals);
	    	}
		});
	};

	var counterWayPoint = function() {
		if ($('#counter-animate').length > 0 ) {
			$('#counter-animate').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '90%' } );
		}
	};


	var imgPopup = function() {


		$('body').on('click', '.img-popup', function(event){
			event.preventDefault();
			var src = $(this).attr('href');
			$.magnificPopup.open({
		      items: {
			      src: src
			   },
			   type: 'image'
		  	});
				
		});
		
	};


	// Document on load.
	$(function(){
		fullHeight();
		burgerMenu();
		counter();
		contentWayPoint();
counterWayPoint();
		imgPopup();
	});



}());

window.addEventListener("DOMContentLoaded", function () {
	// get the form elements defined in your form HTML above
  
	var form = document.getElementById("my-form");
	var button = document.getElementById("my-form-button");
	var status = document.getElementById("status");
  
	// Success and Error functions for after the form is submitted
  
	function success() {
	  form.reset();
	  status.classList.add("success");
	  status.innerHTML = "Thanks!";
	}
  
	function error() {
	  status.classList.add("error");
	  status.innerHTML = "Oops! There was a problem.";
	}
  
	// handle the form submission event
  
	form.addEventListener("submit", function (ev) {
	  ev.preventDefault();
	  var data = new FormData(form);
	  ajax(form.method, form.action, data, success, error);
	});
  });
  
  // helper function for sending an AJAX request
  
  function ajax(method, url, data, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
	  if (xhr.readyState !== XMLHttpRequest.DONE) return;
	  if (xhr.status === 200) {
		success(xhr.response, xhr.responseType);
	  } else {
		error(xhr.status, xhr.response, xhr.responseType);
	  }
	};
	xhr.send(data);
  }
  