var validate = {
    /**
     * Проверка всех инпутов формы
     * @param $form
     * @returns {boolean}
     */
    checkData: function ($form) {
        this.$form = $form;
        var t = this;
        this.valid = true;

        this.$form.find('.form__input').each(function () {
            t.checkInput($(this));
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
        $input.closest('.form__group').find('.tooltip').css({'display': 'inline-block'});
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
        this.$form = $form;
        var t = this;

        this.$form.find('.form__input').each(function () {
            t.clearOne($(this))
        });
    },

    /**
     * Очистить одно поле от ошибок
     * @param $input
     */
    clearOne: function ($input) {
        $input.closest('.form__group').find('.tooltip').css({'display': 'none'});
        $input.removeClass('error');
    }
};


$(function () {

    //Форма обратной связи
    var $formSend = $('#massage-form');
    $formSend.on('submit', function (e) {
        e.preventDefault();
        //if (validate.checkData($(this))) {
            var form_data = $(this).serialize(); //собераем все данные из формы
            $.ajax({
                type: "POST", //Метод отправки
                url: "php/send.php", //путь до php фаила отправителя
                data: form_data,
                success: function () {
                    alert("Ваше сообщение отпрвлено!");
                }
            });
        //}
    });

    //Очистка форм
    $formSend.on('reset', function () {
        validate.clearAll($(this))
    });

    //Валидация изменений в инпутах формы
    $('.form__input').on('keyup', function () {
        validate.checkInput($(this))
    });
});

