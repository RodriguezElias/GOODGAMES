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

//---- AJAX -------------------------------------
/* let datos;
function traerDatos(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'js/product.json', true);
    xhttp.send();
    
    xhttp.onreadystatechange = () =>{

        datos = this.responseText;
}
    return datos;
}
let elias = traerDatos();
console.log(elias) */


//-----------------------------------------
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
            Productos.forEach(prod =>{

                let container_card = document.createElement('div');
                container_card.classList.add('container-card');
                
                let card_img = document.createElement('div');
                card_img.classList.add('card-img');
                container_card.appendChild(card_img);
            
                let image_card = document.createElement('img');
                image_card.setAttribute('src', prod.image)
                card_img.appendChild(image_card);
                
                let img_title = document.createElement('h2');
                img_title.id = 'img-title';
                img_title.textContent = `${prod.name}`;
                img_title.classList.add('margin-0','wrapper','img-title');
                card_img.appendChild(img_title);
                
                let card_info = document.createElement('div');
                card_info.classList.add('card-info');
                container_card.appendChild(card_info);

                let info_product = document.createElement('p');
                info_product.id = 'info-product';
                info_product.classList.add('info', 'margin-0');
                info_product.textContent = `${prod.description}`
                card_info.appendChild(info_product);
                
                let price_product = document.createElement('p');
                price_product.id = 'price-product';
                price_product.classList.add('price', 'margin-0');
                price_product.textContent = `$${prod.price}`
                card_info.appendChild(price_product);
                
                
                let button_buy = document.createElement('button');
                button_buy.classList.add('button-buy');
                button_buy.textContent = "Add to cart";
                button_buy.dataset.id = prod.id;
                let icon_cart = document.createElement('i');
                icon_cart.classList.add('fas', 'fa-shopping-cart', 'fa-lg');
                button_buy.appendChild(icon_cart);
                card_info.appendChild(button_buy);
                
                let container_product = document.querySelector('#container-product');
                container_product.appendChild(container_card);
                });

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
const menu_cart = document.querySelector('.menu-cart');
const cart_button = document.querySelector('.cart');


//LISTENERS
const filterEnter = (e) => {
    if(e.key === 'Enter'){
        const search = input_search.value.toLowerCase();
        const result = Productos.filter(prod => prod.name.toLowerCase().indexOf(search) > -1);
        
        let resultadoHTML = '';

        if(result){
            container_product.innerHTML = '';
            $('#container-product').hide();

            result.forEach(prod => {

                let container_card = document.createElement('div');
                container_card.classList.add('container-card');
                
                let card_img = document.createElement('div');
                card_img.classList.add('card-img');
                container_card.appendChild(card_img);
            
                let image_card = document.createElement('img');
                image_card.setAttribute('src', prod.image)
                card_img.appendChild(image_card);
                
                let img_title = document.createElement('h2');
                img_title.id = 'img-title';
                img_title.textContent = `${prod.name}`;
                img_title.classList.add('margin-0','wrapper','img-title');
                card_img.appendChild(img_title);
                
                let card_info = document.createElement('div');
                card_info.classList.add('card-info');
                container_card.appendChild(card_info);

                let info_product = document.createElement('p');
                info_product.id = 'info-product';
                info_product.classList.add('info', 'margin-0');
                info_product.textContent = `${prod.description}`
                card_info.appendChild(info_product);
                
                let price_product = document.createElement('p');
                price_product.id = 'price-product';
                price_product.classList.add('price', 'margin-0');
                price_product.textContent = `$${prod.price}`
                card_info.appendChild(price_product);
                
                
                let button_buy = document.createElement('button');
                button_buy.classList.add('button-buy');
                button_buy.textContent = "Add to cart";
                button_buy.dataset.id = prod.id;
                let icon_cart = document.createElement('i');
                icon_cart.classList.add('fas', 'fa-shopping-cart', 'fa-lg');
                button_buy.appendChild(icon_cart);
                card_info.appendChild(button_buy);
                
                let container_product = document.querySelector('#container-product');
                container_product.appendChild(container_card);
                })
        }
        input_search.value = "";
        $('#container-product').fadeIn();      
    }

    
}
const filterIcon = (e) => {
        const search = input_search.value.toLowerCase();
        const result = Productos.filter(prod => prod.nombre.toLowerCase().includes(search))
        console.log(result);
    
}

const closeCart = () =>{
    menu_cart.style.right = '-100%';

};


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
        title: obj.querySelector('#img-title').textContent,
        price: obj.querySelector('#price-product').textContent,
        description: obj.querySelector('#info-product').textContent,
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
        button_empty_cart.classList.add('btn-empty');
        button_empty_cart.id = 'btn-empty';
        button_empty_cart.textContent = "Empty";
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
    
    if (count === 0) {
        count ++
        localStorage.setItem('count', count);
        printCountPurchase();
    }else{
        count ++
        number.textContent = count;
        localStorage.setItem('count', count);
    }
    
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
    printProductOrder(Productos);
    sort_by_price.checked = false;
    sort_by_alphabet.checked = false;
};
const sortXbox = ()=>{
    orderly = Productos.filter(prod => prod.console == "xbox one")
    printProductOrder(orderly);
    sort_by_price.checked = false;
    sort_by_alphabet.checked = false;
};
const sortPlaystation = ()=>{
    orderly = Productos.filter(prod => prod.console == "playstation 4")
    printProductOrder(orderly);
    sort_by_price.checked = false;
    sort_by_alphabet.checked = false;
};
const sortNintendo = ()=>{
    orderly = Productos.filter(prod => prod.console == "nintendo")
    printProductOrder(orderly);
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
        printProductOrder(orderly); 
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
        printProductOrder(orderly); 
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
        printProductOrder(orderly); 
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
        printProductOrder(orderly); 
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






//Funcion para imprimir los productos ordenados-------------------------------------------------

const printProductOrder = (products)=>{
    container_product.innerHTML = '';
    $('#container-product').hide();
    products.forEach(prod =>{
        let container_card = document.createElement('div');
        container_card.classList.add('container-card');
        
        let card_img = document.createElement('div');
        card_img.classList.add('card-img');
        container_card.appendChild(card_img);
    
        let image_card = document.createElement('img');
        image_card.setAttribute('src', prod.image)
        card_img.appendChild(image_card);
        
        let img_title = document.createElement('h2');
        img_title.id = 'img-title';
        img_title.textContent = `${prod.name}`;
        img_title.classList.add('margin-0','wrapper','img-title');
        card_img.appendChild(img_title);
        
        let card_info = document.createElement('div');
        card_info.classList.add('card-info');
        container_card.appendChild(card_info);

        let info_product = document.createElement('p');
        info_product.id = 'info-product';
        info_product.classList.add('info', 'margin-0');
        info_product.textContent = `${prod.description}`
        card_info.appendChild(info_product);
        
        let price_product = document.createElement('p');
        price_product.id = 'price-product';
        price_product.classList.add('price', 'margin-0');
        price_product.textContent = `$${prod.price}`
        card_info.appendChild(price_product);
        
        
        let button_buy = document.createElement('button');
        button_buy.classList.add('button-buy');
        button_buy.textContent = "Add to cart";
        button_buy.dataset.id = prod.id;
        let icon_cart = document.createElement('i');
        icon_cart.classList.add('fas', 'fa-shopping-cart', 'fa-lg');
        button_buy.appendChild(icon_cart);
        card_info.appendChild(button_buy);
        
        let container_product = document.querySelector('#container-product');
        container_product.appendChild(container_card);
        });
    $('#container-product').fadeIn();   
};








