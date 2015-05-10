var slider = (function () {

    var flag = true,
        timer,
        interval = 2500;


    return {
        init: function () {

            var _this = this;

            //создадим точки

            _this.createDots();


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

            //клик по точкам

            $('.slider__dots-link').on('click', function (e) {
                e.preventDefault();


                if (!flag) {

                    return;

                }

                _this.clearTimer();



                var
                    $this = $(this),
                    dots = $this.closest('.slider__dots').find('.slider__dots-item'),
                    activeDot = dots.filter('.active'),
                    dot = $this.closest('.slider__dots-item'),
                    curDotNum = dot.index(),
                    direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
                    slide = $this.closest('.slider').find('.slider__item').eq(curDotNum);

                if (curDotNum !== activeDot.index()) {

                    _this.moveSlide(slide, direction);
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


                _this.setActiveDot(container.find('.slider__dots'));

                flag = true;

            });


        },


        createDots: function () {

            var
                _this = this,
                container = $('.slider');

            var
                dotMarkup = '<li class="slider__dots-item"> \
                    <a class="slider__dots-link" href="#"></a> \
            </li>';


            container.each(function () {
                var
                    $this = $(this),
                    slides = $this.find('.slider__item'),
                    dotContainer = $this.find('.slider__dots');

                for (var i = 0; i < slides.size(); i++) {
                    dotContainer.append(dotMarkup);
                }


                _this.setActiveDot(dotContainer);


            });


        },

        setActiveDot: function (container) {
            var
                slides = container.closest('.slider__list--wrap').find('.slider__item');

            container
                .find('.slider__dots-item')
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
