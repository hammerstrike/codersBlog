
// Contact Form Scripts
var alertify = function(opt,msg){
	switch(opt){
		case 'success' : {
			$('.global-alert .alert')
				.removeClass('alert-success')
				.removeClass('alert-info')
				.removeClass('alert-warning')
				.removeClass('alert-danger')
				.addClass('alert-success')
				.text(msg);
			$('.global-alert').fadeIn(300).delay(3000).fadeOut(300);
		}
		break;

		case 'info' : {
			$('.global-alert .alert')
				.removeClass('alert-success')
				.removeClass('alert-info')
				.removeClass('alert-warning')
				.removeClass('alert-danger')
				.addClass('alert-info')
				.text(msg);
			$('.global-alert').fadeIn(300).delay(3000).fadeOut(300);
		}
		break;

		case 'warning' : {
			$('.global-alert .alert')
				.removeClass('alert-success')
				.removeClass('alert-info')
				.removeClass('alert-warning')
				.removeClass('alert-danger')
				.addClass('alert-warning')
				.text(msg);
			$('.global-alert').fadeIn(300).delay(3000).fadeOut(300);
		}
		break;
	}
}

$(document).ready(function(){

  $('.heading').focus();

	/* ------------------------
		 				Add Post
	   -----------------------*/
	//select category
	$('.cat-dropdown-menu li a').on('click',function () {
			var catname = $(this).attr('data-value');
			$('#catdropval').val(catname);
			$('#catdrop .drpdwntr').text(catname);
	});

	//add post ajax
	$('#add_new_post')
		.on('submit',function(e){
			e.preventDefault();
			var url = $(this).attr('action');
			var inputData = {
					postTitle 	: $('#postheading').val(),
					postShortle : $('#postshortle').val(),
					postDesc		: $('#postdescription').val(),
					postAuthor  : $('#postauthor').val(),
					postCat  		: $('#catdropval').val()
			}

			$.ajax({
						type: 'POST',
						data: JSON.stringify(inputData),
				    contentType: 'application/json',
            url: "addPost",
              success: function(data) {
                  if(data.success){
										alert('Post added');
									}else{
										alert('something wrong');
									}
              }
          });
		});

  //login
	$('#frmLogin')
		.on('submit',function (e) {
			e.preventDefault();
			var url = $(this).attr('action');
			var inputData = {
					username 	: $('#lusername').val(),
					password : $('#lpassword').val()
			}

			$.ajax({
						type: 'POST',
						data: JSON.stringify(inputData),
				    contentType: 'application/json',
            url: "users/login",
              success: function(data) {
                  if(data.success){
										//alert('user found');
										window.location = '/';
									}else{
										alert('user not found');
									}
              }
          });
		});

		//Register
		$('#regForm')
			.on('submit',function (e) {
				e.preventDefault();				
				var inputData = {
						email 	: $('#remail').val(),
						password : $('#rpassword').val()
				}
				$.ajax({
							type: 'POST',
							data: JSON.stringify(inputData),
					    contentType: 'application/json',
	            url: "users/register",
              success: function(data) {
                  alert(data.msg);
									}
	          });
			});
});


// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});
