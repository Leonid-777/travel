$(document).ready(function() {
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 1,
                    maxlength: 20
                  },
                phone: 'required',
                mail: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Ошибка! Минимальное количество символов - {0}"),
                    maxlength: jQuery.validator.format("Ошибка! Максимальное количество символов - {0}")
                },
                phone: 'Пожалуйста, введите номер телефона',
                mail: {
                  required: "Пожалуйста, введите адрес элетронной почты",
                  mail: "Ошибка! Неверный адрес почты"
                }
            }
        });
    };

    validateForms('.contact__form');

    $('input[name="phone"]').mask("+7(999)999-99-99");

    //hamburger menu 

    $(".menuToggle").click(function() {
        $(this).toggleClass("active");
        $('.menu').slideToggle(300, function() {
            if($(this).hasClass('not')) {
                $(this).removeClass('not')
            }
        });
    });
   
});