
/* function to scroll to specific benefit */
function scroll_to_benefit(type, type_selector){
    /* show benefit if not selected */
    if ($(".benefits "+type).hasClass("hide"))
        $(".benefits .nav li:"+type_selector+" a").trigger("click");
    /* scroll to specific benefit slowly*/
    $("html, body").animate({
        scrollTop: $(type).offset().top - 285
    }, 800);
    /* hide menu */
    if ($(window).width() < 575){
        $(".navbar-collapse").collapse("hide");
    }
}

function set_benefit(benefit_type) {
    if (benefit_type == "For Customers")
	    scroll_to_benefit("#for-customer", "first-child");
    else if (benefit_type == "For Restaurants")
        scroll_to_benefit("#for-restaurant", "last-child");
}

/* entry point */
$(document).ready(function(){
	/* swap active class on benefits change */
	$(".benefits .nav a").on("click", function(){
	    $(".benefits .nav a").removeClass("active");
	    $(this).addClass("active");
	    active_content = $(this).text().trim();
	    if (active_content == "For Customers"){
	        $(".benefits #for-customer").removeClass("hide");
            $(".benefits #for-restaurant").addClass("hide");
	    } else {
	        $(".benefits #for-restaurant").removeClass("hide");
            $(".benefits #for-customer").addClass("hide");
	    }
	});
	/* call to benefits from faq */
	var clicked_item = localStorage.getItem("clickedItem");
	if (clicked_item !== null)
	    set_benefit(clicked_item);
    localStorage.removeItem("clickedItem");
	/* scroll to benefits */
	$(".benefits-nav-item div .dropdown-item").click(function(){
	    active_content = $(this).text().trim();
	    set_benefit(active_content);
	});
    /* member register button */
    $(".register-tag button").on("click", function(){
        $(".register-restaurant").trigger("click");
    });
});