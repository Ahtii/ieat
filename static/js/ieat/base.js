/* navbar color change on scroll */
$(function(){
	$(document).scroll(function(){
		var $nav = $(".fixed-top");
		var $navbar = $(".navbar");
		var $logo_brand = $(".navbar-brand");
		if ($(this).scrollTop() > $nav.height()){
			$nav.toggleClass('scrolled', true);
			$logo_brand.toggleClass('scrolled', true);
			$navbar.toggleClass('shadow', true);
		}else{
			$nav.toggleClass('scrolled', false);
			$logo_brand.toggleClass('scrolled', false);
			$navbar.toggleClass('shadow', false);
		}
	});
});

/* function for customized dropdown on mobile version */
function adjust_nav(){
	if ($(window).width() < 575)
		$("#navbarCollapseTarget").addClass("ieat-nav");
	else
		$("#navbarCollapseTarget").removeClass("ieat-nav");
}

var validators = {
    isValidName: function(name){
        let pattern = new RegExp(/^([a-z]+(\s[a-z]+)*){3,30}$/i);
        return pattern.test(name);
    },
    isValidPhone: function(phone){
        let pattern = new RegExp(/^[0-9]{10}$/i);
        return pattern.test(phone);
    },
    isValidEmail: function(email){
        let pattern = new RegExp(/^[\w.%+-]+@[a-z0-9]+(\.[a-z]{2,}){1,2}$/i);
        return pattern.test(email);
    },
    isValidOccupation: function(occupation){
        let pattern = new RegExp(/^([a-z]+(\s[a-z]+)*){2,30}$/i);
        return pattern.test(occupation);
    },
    isValidRestaurantName: function(name){
        let pattern = new RegExp(/^([a-z]+(\s[a-z0-9]+)*){2,30}$/i);
        return pattern.test(name);
    },
    isValidAddress: function(address){
        let pattern = new RegExp(/^[a-z0-9\s,]{6,50}$/i);
        return pattern.test(address);
    }
}

function validate_customer_form(input, value){
    if (input == "c-name"){
        $("#c-err-name").text("");
        if (!validators.isValidName(value))
            $("#c-err-name").text("Min 3, Max 30, only alphabets.");
    }
    else if (input == "c-phone"){
        $("#c-err-phone").text("");
        if (!validators.isValidPhone(value))
            $("#c-err-phone").text("Only 10 digits are allowed.");
    }
    else if (input == "c-email"){
        $("#c-err-email").text("");
        if (!validators.isValidEmail(value))
            $("#c-err-email").text("Invalid email format.");
    }
    else {
        $("#c-err-occupation").text("");
        if (!validators.isValidOccupation(value))
            $("#c-err-occupation").text("Min 2, Max 30, only alphabets.");
    }       
}

function validate_customer(){
    $("#customer-form input").on("keyup change", function(e){        
        validate_customer_form($(this).attr("id"), $(this).val());
    });    
}

function validate_restaurant_form(input, value){
    if (input == "r-name"){
        $("#r-err-name").text("");
        if (!validators.isValidRestaurantName(value))
            $("#r-err-name").text("Min 2, Max 30, only alphanumeric.");
    }
    else if (input == "r-phone"){
        $("#r-err-phone").text("");
        if (!validators.isValidPhone(value))
            $("#r-err-phone").text("Only 10 digits are allowed.");
    }
    else if (input == "r-email"){
        $("#r-err-email").text("");
        if (!validators.isValidEmail(value))
            $("#r-err-email").text("Invalid email format.");
    }
    else {
        $("#r-err-address").text("");
        if (!validators.isValidAddress(value))
            $("#r-err-address").text("Min 6, Max 50, only alphanumeric.");
    }       
}

function validate_restaurant(){
    $("#restaurant-form input").on("keyup change", function(e){        
        validate_restaurant_form($(this).attr("id"), $(this).val());
    });    
}

var customer_choose = "", restaurant_choose = "";

function customer_form_err(){
    var no_err = true;
    customer_choose = $("#customer-form .heard-from button").text().trim();
    $("#c-err-heard").text("");
    if(customer_choose == "Choose"){
        $("#c-err-heard").text("Please choose where you heard about us.");
        no_err = false;
    }     
    $("#customer-form .form-group").each(function(index, element){
        var input = $(element).children("input");
        var span = $(element).children("span");        
        var id = span.attr("id");
        if (id != "c-err-email"){
            if (!input.val()){                        
                span.text("This field is required.");                          
                no_err = false; 
            } else if (span.text())
                no_err = false;     
        }
    });    
    return no_err;
}

function restaurant_form_err(){
    var no_err = true;
    restaurant_choose = $("#restaurant-form .heard-from button").text().trim();
    $("#r-err-heard").text("");
    if(restaurant_choose == "Choose"){
        $("#r-err-heard").text("Please choose where you heard about us.");
        no_err = false;
    }     
    $("#restaurant-form .form-group").each(function(index, element){
        var input = $(element).children("input");
        var span = $(element).children("span");        
        var id = span.attr("id");
        if (id != "r-err-email"){
            if (!input.val()){                        
                span.text("This field is required.");                          
                no_err = false; 
            } else if (span.text())
                no_err = false;     
        }
    });    
    return no_err;
}

$(document).ready(function(){
    // show cutomized dropdown on mobile version
	adjust_nav();
	$(window).on('resize', function(){
		adjust_nav();
	});
	/* change nav button icon on click */
	$(".navbar-collapse").on("shown.bs.collapse", function() {
        $(".navbar-toggler i").removeClass("fa-bars");
        $(".navbar-toggler i").addClass("fa-times");
    }).on("hidden.bs.collapse", function() {
        $(".navbar-toggler i").addClass("fa-bars");
        $(".navbar-toggler i").removeClass("fa-times");
    });
	/* show customer register modal */
	$(".register-customer").click(function(){
	   if ($("#customer-modal").hasClass("flipOutY"))
	        $("#customer-modal").removeClass("flipOutY");
	   $("#customer-modal").addClass("flipInY");
	   $("#customer-modal").modal("show");
	   $(".navbar-collapse").collapse("hide");
	});
	/* show restaurant register modal */
	$(".register-restaurant").click(function(){
	   if ($("#restaurant-modal").hasClass("flipOutY"))
	        $("#restaurant-modal").removeClass("flipOutY");
	   $("#restaurant-modal").addClass("flipInY");
	   $("#restaurant-modal").modal("show");
       $(".navbar-collapse").collapse("hide");
	});
	/* change form one modal to other */
	$(".modal-swapper").on("click", function(){
	    var target_modal = $(this).find("strong").text();
	    if (target_modal == "Restaurant"){
	        $("#customer-modal .close").trigger("click");
	        setTimeout(function() {
                $(".register-restaurant").trigger("click");
            }, 500);
	    } else {
	        $("#restaurant-modal .close").trigger("click");
	        setTimeout(function() {
                $(".register-customer").trigger("click");
            }, 500);
	    }
	});
	/* close modal */
	$(".modal .close").click(function() {
        var $this = "#" + $(this).parents("div.modal").attr('id');
        if ($($this).hasClass('flipInY'))
            $($this).removeClass('flipInY');
        $($this).addClass('flipOutY');
        setTimeout(function() {
            $($this).modal("hide");
        }, 500)
    });
    /* page scroller */
    $('.page-scroller').on('click', function(e) {
        e.preventDefault();
        if ($('.page-scroller i').attr('class') == 'fa fa-chevron-down') {
            $('.page-scroller i').removeClass('fa fa-chevron-down');
            $('.page-scroller i').addClass('fa fa-chevron-up');
            $('.page-scroller').removeClass('page-scroller-up');
            $('.page-scroller').addClass('page-scroller-down');
            $([document.documentElement, document.body]).animate({
                scrollTop: $("footer").offset().top
            }, 800)
        } else {
            $('.page-scroller i').removeClass('fa fa-chevron-up');
            $('.page-scroller i').addClass('fa fa-chevron-down');
            $('.page-scroller').removeClass('page-scroller-down');
            $('.page-scroller').addClass('page-scroller-up');
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".cover").offset().top
            }, 800)
        }
    });

    $("#customer-form .heard-from .dropdown-item").on("click", function(){
        $("#c-err-heard").text("");
        $("#customer-form .heard-from button").text($(this).text());        
    });

    $("#restaurant-form .heard-from .dropdown-item").on("click", function(){
        $("#r-err-heard").text("");
        $("#restaurant-form .heard-from button").text($(this).text());        
    });

    /* submit customer form */
    validate_customer();
    $("#customer-form").on("submit", function(e){
        e.preventDefault();
        if (customer_form_err()){  
            var data = {
                "name": $("#c-name").val(),
                "phone": $("#c-phone").val(),
                "occupation": $("#c-occupation").val(),
                "heard-from": customer_choose,
                csrfmiddlewaretoken: $('#customer-form input[name=csrfmiddlewaretoken]').val()
            };              
            var email = $("#c-email").val();
            if (!$("c-err-email").text() && email)
                data["email"] = email;                        
            $("#customer-form .modal-footer i").css("display", "inline-block");
            $('#customer-form button[type="submit"]').css('display', "none");
            $.post("register_customer", data, function(response){  
                var error = response['error']              
                if (error){
                    var type = response['type'];
                    if (type == "existing")
                       $("#c-err-phone").text(error);                         
                }else {
                    $("#customer-form input").val("");  
                    $("#customer-form .heard-from button").text("Choose");              
                    $("#customer-modal .close").trigger("click");
                    $(".notification").css("display", "block");
                    setTimeout(function() {
                        $(".notification").css("display", "none");
                    }, 5000);
                }    
                $("#customer-form .modal-footer i").css("display", "none");
                $('#customer-form button[type="submit"]').css('display', "inline-block");
            });
        }
    });

    /* submit restaurant form */
    validate_restaurant();
    $("#restaurant-form").on("submit", function(e){
        e.preventDefault();
        if (restaurant_form_err()){  
            var data = {
                "name": $("#r-name").val(),
                "phone": $("#r-phone").val(),
                "address": $("#r-address").val(),
                "heard-from": restaurant_choose,
                csrfmiddlewaretoken: $('#restaurant-form input[name=csrfmiddlewaretoken]').val()
            };              
            var email = $("#r-email").val();
            if (!$("r-err-email").text() && email)
                data["email"] = email;                        
            $("#restaurant-form .modal-footer i").css("display", "inline-block");
            $('#restaurant-form button[type="submit"]').css('display', "none");
            $.post("register_restaurant", data, function(response){    
                var error = response['error']              
                if (error){
                    var type = response['type'];
                    if (type == "existing")
                       $("#r-err-phone").text(error);            
                }else {
                    $("#restaurant-form input").val("");  
                    $("#restaurant-form .heard-from button").text("Choose");              
                    $("#restaurant-modal .close").trigger("click");
                    $(".notification").css("display", "block");
                    setTimeout(function() {
                        $(".notification").css("display", "none");
                    }, 5000);
                }    
                $("#restaurant-form .modal-footer i").css("display", "none");
                $('#restaurant-form button[type="submit"]').css('display', "inline-block");
            });
        }
    });
});