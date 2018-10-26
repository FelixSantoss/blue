var scroolimit = 300;

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
     
    if (scroll >= scroolimit) {
        $('.container-menu').removeClass('addwhiteslider');

        $('.container-menu').addClass('addblueslider');
        $('.fil0, .fil1').addClass('fillwhit');
        $('.fil2').addClass('fillblue');

    } else {

        if ($("#menu").hasClass("addblueslider")) {

            $('.fil2').removeClass('fillblue');
            $('.fil0, .fil1').removeClass('fillwhit');
            $('.container-menu').removeClass('addblueslider');

        }

    }

});


