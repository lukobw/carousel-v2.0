$(function () {

    var carouselList = $('#js-myCarousel ul');
    var currentSlideIndex = 0;
    var $indicators = $('.indicators .item');
    var lastSlideIndex = $indicators.length - 1;
    var interval = setInterval(function () {
        moveSlidesForward(1);
    }, 1000);

//start karuzeli//

    function moveSlidesForward(numberOfSlides) {
        // if (currentSlideIndex === lastSlideIndex) {
        //     return;
        // }
        carouselList.animate({'margin-left': -400 * numberOfSlides}, 500, function () {
        moveSlidesFromStart(numberOfSlides);
        });
        currentSlideIndex += numberOfSlides;
        currentSlideIndex %= $indicators.length;
        setActiveSlide(currentSlideIndex);
    }

    function moveSlidesFromStart(numberOfSlides) {
        var firstItems = $('#js-myCarousel').find('li').slice(0, numberOfSlides);
        var lastItem = $('#js-myCarousel').find('li:last');
        lastItem.after(firstItems);
        carouselList.css({marginLeft: 0});
    }

//odwrócona kolejnośc przewijania//

    function moveSlidesBackwards(numberOfSlides) {
        // if (currentSlideIndex === 0) {
        //     return;
        // }
        moveSlidesFromEnd(numberOfSlides);
        carouselList.animate({'margin-left': 0}, 500);
        currentSlideIndex -= numberOfSlides;
        currentSlideIndex %= $indicators.length;
        setActiveSlide(currentSlideIndex);
    }

    function moveSlidesFromEnd(numberOfSlides) {
        var firstItem = $('#js-myCarousel').find('li:first');
        var lastItems = $('#js-myCarousel').find('li').slice(-numberOfSlides);
        firstItem.before(lastItems);
        carouselList.css({marginLeft: -400 * numberOfSlides});
    }

    function arrowClickRight() {
        // moveSlidesForward(1);
        interval = clearInterval(interval);
        interval = setInterval(function () {
            moveSlidesForward(1);
        }, 1000);
    }

    function arrowClickLeft() {
        // moveSlidesBackwards(1);
        interval = clearInterval(interval);
        interval = setInterval(function () {
            moveSlidesBackwards(1);
        }, 1000);
    }

    $('.indicators .restart').on('click', function () {
        interval = clearInterval(interval);
        interval = setInterval(function () {
            moveSlidesForward(1);
        }, 1000);
    });

    $('.indicators .pause').on('click', function () {
        interval = clearInterval(interval);
    });

//strzałki przełaczające slajdy//

    var arrowLeft = $('.arrow-left'),
        arrowRight = $('.arrow-right');

    arrowLeft.on('click', arrowClickLeft);
    arrowRight.on('click', arrowClickRight);

    function setActiveSlide(j) {
        $indicators.removeClass('active');
        $indicators.eq(j).addClass('active');
    }

    $('.indicators .item').on('click', function () {
        var clickedDotIndex = $(this).index();
        var difference = currentSlideIndex - clickedDotIndex;
        interval = clearInterval(interval);

        if (difference > 0) {
            // obecny slajd jest dalej niz kropka ktora kliknelismy
            // czyli musimy sie cofnac
            moveSlidesBackwards(difference);
        } else if (difference < 0) {
            // obecny slajd jest blizej niz kropka
            // musimy isc do przodu
            moveSlidesForward(-difference);
            // UWAGA! roznica jest ujemna ale my chcemy podac liczbe dodatnia do funkcji moveSlideForward
            // dlatego dorzucamy minus przed difference
        }
    });
});
