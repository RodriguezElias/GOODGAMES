//Funcion para imprimir los productos ordenados-------------------------------------------------

const printProduct = (products)=>{
    const container_product = document.querySelector('#container-product');
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
        
        let card_info = document.createElement('div');
        card_info.classList.add('card-info');
        container_card.appendChild(card_info);

        let name_product = document.createElement('p');
        name_product.id = 'name-product';
        name_product.classList.add('info', 'margin-0');
        name_product.textContent = `${prod.name}`
        card_info.appendChild(name_product);
        
        let container_price = document.createElement('div');
        container_price.classList.add('container-price');
        let price_product = document.createElement('p');
        price_product.id = 'price-product';
        price_product.classList.add('price', 'margin-0');
        price_product.textContent = `${prod.price}`
        container_price.appendChild(price_product);
        card_info.appendChild(container_price);
        
        
        let button_buy = document.createElement('button');
        button_buy.classList.add('button-buy','shadow-button');
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
const closeCart = () =>{
    const menu_cart = document.querySelector('.menu-cart');
    menu_cart.style.right = '-100%';

};


export {printProduct,closeCart};

