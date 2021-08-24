//funciones para abrir y cerrar el carrito y el menu hamburguesa
$(document).ready(openCart);
$(document).ready(menu_cart_f);
let count_menu_bar = 1;
function openCart(){
    $('.menu-bar').click(function(){
        //$('.nav').toggle();
        if(count_menu_bar == 1){
            $('.nav').animate({
                left: '0'
            });
            count_menu_bar = 0;
        } else{
            count_menu_bar = 1;
            $('.nav').animate({
                left: '-100%'
            });
        }

    });
}
const closeCart = () =>{
  const menu_cart = document.querySelector('.menu-cart');
  menu_cart.style.right = '-100%';

};

function menu_cart_f(){
    $('.cart').click(function(){
        //$('.nav').toggle();
            $('.menu-cart').animate({
                right: '0'
            });
            
    });
}
const item = document.querySelectorAll("#item");
const dropDown = (e) =>{
  const drop = e.target.nextElementSibling
  drop.classList.toggle("open-list")
}
item.forEach(item =>{
  item.addEventListener("click", (e)=>{
    dropDown(e)
  })
})


export {openCart,closeCart, menu_cart_f, dropDown};

