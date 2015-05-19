var validate = {
    /**
     * Проверка всех инпутов формы
     * @param $form
     * @returns {boolean}
     */
    checkData: function ($form) {
        var that = this;
        that.$form = $form;
        that.valid = true;

        this.$form.find('.input-group__input').each(function () {
            that.checkInput($(this));
        });

        return this.valid;
    },

    /**
     * Проверка одного инпута
     * @param $input
     */
    checkInput: function ($input) {
        if ($input.val() == '') {
            this.showTooltip($input);
            this.addError($input);
            this.valid = false;
        } else {
            this.clearOne($input);
        }
    },

    /**
     * Показать тултип
     * @param $input
     */
    showTooltip: function ($input) {
        $input.closest('.input-group').find('.contact-form__tooltip').css({'display': 'inline-block'});
    },

    /**
     * Показать ошибку в инпуте
     * @param $input
     */
    addError: function ($input) {
        $input.addClass('error');
    },

    /**
     * Очистить все поля от ошибок
     * @param $form
     */
    clearAll: function ($form) {
        var that = this;
        that.$form = $form;

        that.$form.find('.input-group__input').each(function () {
            that.clearOne($(this))
        });
    },

    /**
     * Очистить одно поле от ошибок
     * @param $input
     */
    clearOne: function ($input) {
        $input.closest('.input-group').find('.contact-form__tooltip').css({'display': 'none'});
        $input.removeClass('error');
    }
};


$(function () {

    //Форма обратной связи
    var $formSend = $('#massage-form');
    $formSend.on('submit', function (e) {
        e.preventDefault();
        if (validate.checkData($(this))) {
            var form_data = $(this).serialize(); //собераем все данные из формы
            $.ajax({
                type: "POST", //Метод отправки
                url: $formSend.attr("action"), //путь до php фаила отправителя
                data: form_data,
                success: function () {
                    alert("Ваше сообщение отпрвлено!");
                }
            });
        }
    });

    //Очистка форм
    $formSend.on('reset', function () {
        validate.clearAll($(this))
    });

    //Валидация изменений в инпутах формы
    $('.input-group__input').on('keyup', function () {
        validate.checkInput($(this))
    });
});

