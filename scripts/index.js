$(document).ready(function () {

//Меню для адаптива
    function openMenu() {
        $('#menu').addClass('open');
    }

    $('#burger').on('click', openMenu);

    function closeMenu() {
        $('#menu').removeClass('open');
    }

    $('.menu__link, .close').on('click', closeMenu);

// Валидация полей в форме заказа + loader

    let loader = $('.loader');
    $('#submit').click(function () {
        let order = [$('#product'), $('#name'), $('#phone')];
        let hasError = false;

        $('.error-input').hide();

        for (let i = 0; i < order.length; i++) {
            order[i].css('border-color', 'rgb(130, 19, 40)');

            if (!order[i].val()) {
                order[i].next().show();
                order[i].css('border-color', 'red');
                hasError = true;
            }
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: order[0].val(), name: order[1].val(), phone: order[2].val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('#order-form').hide();
                        $('#gratitude').addClass('active');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    })
    
});