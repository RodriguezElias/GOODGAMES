$(document).ready(menu_bar);
$(document).ready(menu_cart_f);
let count_menu_bar = 1;
function menu_bar(){
    $('.menu-bar').click(function(){
        //$('.nav').toggle();
        if(count_menu_bar == 1){
            $('.nav').animate({
                left: '0'
            });
            count_menu_bar = 0;
        } else{
            count_menu_bar = 1;
            console.log(count_menu_bar)
            $('.nav').animate({
                left: '-100%'
            });
        }

    });
}

function menu_cart_f(){
    $('.cart').click(function(){
        //$('.nav').toggle();
            $('.menu-cart').animate({
                right: '0'
            });
            
    });
}

export {menu_bar, menu_cart_f};

