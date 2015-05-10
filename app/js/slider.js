var slider = (function () {

    var flag = true,
        timer,
        interval = 12500;


    return {
        init: function () {

            var _this = this;

            _this.autoSwitch();


            //$('.slider').on('mouse')

            $('.slider__controls-button').on('click', function (e) {
                e.preventDefault();


                if (!flag) {
                    return;

                }

                _this.clearTimer();

                var
                    $this = $(this),
                    slides = $this.closest('.slider').find('.slider__item'),
                    active = slides.filter('.active'),
                    nextSlide = active.next().length ? active.next() : slides.first(),
                    prevSlide = active.prev().length ? active.prev() : slides.last();

                if ($this.hasClass('slider__controls-button_next')) {

                    _this.moveSlide(nextSlide, 'forward');

                } else {

                    _this.moveSlide(prevSlide, 'backward');
                }

            });
        },

        moveSlide: function (slide, direction) {

            flag = false;


            var
                _this = this,
                container = slide.closest('.slider'),
                slides = container.find('.slider__item'),
                active = slides.filter('.active'),
                slideWidth = slides.width(),
                duration = 500,
                reqCssPosition = 0,
                reqSlideStrafe = 0;





            if (direction === 'forward') {

                reqCssPosition = slideWidth;
                reqSlideStrafe = -slideWidth;

            } else if (direction === 'backward') {

                reqCssPosition = -slideWidth;
                reqSlideStrafe = slideWidth;
            }


            slide.css('left', reqCssPosition).addClass('inslide');

            var movebleSlide = slides.filter('.inslide');


            active.animate({left: reqSlideStrafe}, duration);

            movebleSlide.animate({left: 0}, duration, function () {

                var $this = $(this);

                slides.css('left', '0').removeClass('active');

                $this.toggleClass('inslide active');

                flag = true;

            });


        },

        setActiveDot: function (container) {
            var
                slides = container.closest('.slider__list--wrap').find('.slider__item');

            container
                .eq(slides.filter('.active').index())
                .addClass('active')
                .siblings()
                .removeClass('active');


        },

        autoSwitch: function () {

            var _this = this;


            timer = setInterval(function () {

                var
                    slides = $('.slider').find('.slider__item'),
                    active = slides.filter('.active'),
                    nextSlide = active.next().length ? active.next() : slides.first();

                _this.moveSlide(nextSlide, 'forward')

            }, interval);


        },

        clearTimer: function () {
            if (timer) {
                clearInterval(timer);
                this.autoSwitch();
            }
        }


    }

}());


$(document).ready(function () {
    if ($('.slider').length) {
        slider.init();
    }
});
