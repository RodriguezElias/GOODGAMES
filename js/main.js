//import functions
import { printProduct,closeCart } from './utils.js';
import { menu_bar, menu_cart_f } from './function_button.js';



// crear el objeto carrito
let cart = {};
let Productos;
let count = 0;
let orderly = [];

$(function() {
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        printCart();
        count = localStorage.getItem('count');
        printCountPurchase();
    }
    else{
        console.log('no hay Productos');
    }

    


    $.ajax({
        url: '../product.json',
        dataType: 'json',
        success: function(data){
            Productos = data;
            printProduct(Productos);

        }
    })
        .fail((jqXHR, textStatus, errorThrown) =>{
            console.log(errorThrown);
        })


})


//Selectores
const cart_list = document.querySelector('#cart-list div');
const cart_list_empty = document.querySelector('#empty');
const container_product = document.querySelector('#container-product');
const icon_search = document.querySelector('#icon-search');
const input_search = document.querySelector('#search');
const close_cart = document.querySelector('.close-cart');
const cart_button = document.querySelector('.cart');


//LISTENERS
const filterEnter = (e) => {
    if(e.key === 'Enter'){
        const search = input_search.value.toLowerCase();
        const result = Productos.filter(prod => prod.name.toLowerCase().indexOf(search) > -1);
        let resultadoHTML = '';
        printProduct(result);
        input_search.value = "";
        $('#container-product').fadeIn();     
    
    }
}
const filterIcon = () => {
        const search = input_search.value.toLowerCase();
        const result = Productos.filter(prod => prod.name.toLowerCase().indexOf(search) > -1);
        printProduct(result);
        input_search.value = "";
        $('#container-product').fadeIn();     
    
}

icon_search.addEventListener('click', filterIcon);
input_search.addEventListener('keypress', filterEnter);
close_cart.addEventListener('click', closeCart);
container_product.addEventListener('click', e => {
    addCart(e);
});


const addCart = e => {
    if(e.target.classList.contains('button-buy')){
        setCart(e.target.parentElement.parentElement);
        addCountPurchase();
    }
    
}


const setCart = obj =>{
    //console.log(obj);
    const product = {
        id: obj.querySelector('.button-buy').dataset.id,
        title: obj.querySelector('#name-product').textContent,
        price: obj.querySelector('#price-product').textContent,
        description: obj.querySelector('#name-product').textContent,
        img: obj.querySelector('img').getAttribute('src'),
        amount: 1,
    }
    if(cart.hasOwnProperty(product.id)){ //pregunta si esta esa propiedad con la key
        product.amount = cart[product.id].amount + 1;
    }
    cart[product.id] = {...product};
    printCart();

}

//imprimir el carrito recorriendo objeto cart 
const printCart = () =>{
    //vaciar los div antes de insertar elementos 
    cart_list.innerHTML = '';

    Object.values(cart).forEach(prod => {
        const container_article = document.createElement('div');

        const article_img = document.createElement('div');
        article_img.classList.add('article_img');
        const img = document.createElement('img');
        img.src = prod.img;
        article_img.appendChild(img);
        
        container_article.appendChild(article_img);
        container_article.classList.add('container_article')

        const article_info = document.createElement('div');
        article_info.classList.add('article_info');

        const article_name = document.createElement('p');
        article_name.textContent = `${prod.title}`
        article_info.appendChild(article_name);

        const article_price = document.createElement('p');
        article_price.textContent = prod.price;
        article_info.appendChild(article_price);

        const article_amount = document.createElement('p');
        article_info.appendChild(article_amount);
        article_amount.textContent = `${prod.amount}`;

        container_article.appendChild(article_info);

        cart_list.appendChild(container_article);

        //guardar los productos en localstorage
        localStorage.setItem('cart', JSON.stringify(cart));

    })

    // crear boton vaciar carrito si hay procuctos
    if(Object.keys(cart).length > 0){
    cart_list_empty.innerHTML='';
    const button_empty_cart = document.createElement('button');
        button_empty_cart.classList.add('button');
        button_empty_cart.id = 'btn-empty';
        button_empty_cart.textContent = "Empty cart";
        cart_list.appendChild(button_empty_cart);

    //agregar evento vaciar carrito
    const empty_cart = document.querySelector('#btn-empty');
    empty_cart.addEventListener('click', () => {
        cart = {};
        localStorage.setItem('cart', JSON.stringify(cart));
        printCart();
        removeAllCountPurchase();
        });
    
    } else {
        cart_list_empty.innerHTML = `<p id="empty">The shopping cart is empty</p>`;
    }

}

//contador del carrito de compras--------------------------------------------------------

let number = document.createElement('span');
    number.classList.add('number');
const addCountPurchase = ()=>{
        count ++
        localStorage.setItem('count', count);
        printCountPurchase();
}
const removeAllCountPurchase = () => {
    count = 0;
    localStorage.setItem('count', count);
    printCountPurchase();
    
}

const printCountPurchase = () => {
    number.textContent = count;
    cart_button.appendChild(number);   
}



// funciones para ordenar productos-----------------------------------
const sortAll = ()=>{
    printProduct(Productos);
    sort_by_price.checked = false;
    sort_by_alphabet.checked = false;
};
const sortXbox = ()=>{
    orderly = Productos.filter(prod => prod.console == "xbox one")
    printProduct(orderly);
    sort_by_price.checked = false;
    sort_by_alphabet.checked = false;
};
const sortPlaystation = ()=>{
    orderly = Productos.filter(prod => prod.console == "playstation 4")
    printProduct(orderly);
    sort_by_price.checked = false;
    sort_by_alphabet.checked = false;
};
const sortNintendo = ()=>{
    orderly = Productos.filter(prod => prod.console == "nintendo")
    printProduct(orderly);
    sort_by_price.checked = false;
    sort_by_alphabet.checked = false;
};

const sortByPrice = ()=>{
    if (sort_xbox.checked || sort_playstation.checked ) {
        orderly = orderly.sort((a,b) => {
            if (a.price < b.price) {
                return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                    return 0
                })
        printProduct(orderly); 
    }else{
        orderly = Productos.sort((a,b) => {
            if (a.price < b.price) {
                return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                    return 0
                })
        printProduct(orderly); 
    }
};
const sortByAlphabet = ()=>{
    if (sort_xbox.checked || sort_playstation.checked ) {
        orderly = orderly.sort((a,b) => {
            if (a.name < b.name) {
                return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                    return 0
                })
        printProduct(orderly); 
    }else{
        orderly = Productos.sort((a,b) => {
            if (a.name < b.name) {
                return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                    return 0
                })
        printProduct(orderly); 
    }
};

const sort_all = document.querySelector('#sort-all');
sort_all.addEventListener('change', sortAll);
const sort_xbox = document.querySelector('#sort-xbox');
sort_xbox.addEventListener('change', sortXbox);
const sort_playstation = document.querySelector('#sort-playstation');
sort_playstation.addEventListener('change', sortPlaystation);
const sort_nintendo = document.querySelector('#sort-nintendo');
sort_nintendo.addEventListener('change', sortNintendo);
const sort_by_price = document.querySelector('#sort-price');
sort_by_price.addEventListener('change', sortByPrice);
const sort_by_alphabet = document.querySelector('#sort-alphabet');
sort_by_alphabet.addEventListener('change', sortByAlphabet);














