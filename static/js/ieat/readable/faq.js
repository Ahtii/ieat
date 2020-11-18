$(document).ready(function(){
    /* scroll to faq on page load */
    $("html, body").animate({
        scrollTop: $(".cover").height() - 50
    }, 500);
    /* benefits clicked */
    $("#benefits_dd").siblings(".dropdown-menu").children(".dropdown-item").on("click", function(){
        localStorage.setItem("clickedItem", $(this).text());
        window.location.replace("/")
    });
    /* swap active class on faq change */
    $(".faq-content .nav a").on("click",function(){
        $(".faq-content .nav a").removeClass("active");
        $(this).addClass("active");
        active_content = $(this).text().trim();
        if (active_content == "For Customers") {
            $(".faq-content #faq-customer").removeClass("faq-hide");
            $(".faq-content #faq-restaurant").addClass("faq-hide");
        } else {
            $(".faq-content #faq-restaurant").removeClass("faq-hide");
            $(".faq-content #faq-customer").addClass("faq-hide");
        }
    });
});