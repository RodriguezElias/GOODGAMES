//import functions
import { printProduct, closeCart } from "./utils.js";
import { menu_bar, menu_cart_f } from "./function_button.js";

// crear el objeto carrito
let cart = {};
let Productos;
let count = 0;
let orderly = [];

document.addEventListener("DOMContentLoaded", () => {
  //extraer los productos del carrito del localStorage
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    printCart();
    count = localStorage.getItem("count");
    printCountPurchase();
  } else {
    console.log("no hay Productos");
  }
  fetchData();
});
const fetchData = async () => {
  try {
    const res = await fetch("../product.json");
    const data = await res.json();
    Productos = data;
    printProduct(Productos);
  } catch (error) {
    console.log(error);
  }
};

//Selectores de elementos------------------------------------------------
const cart_list = document.querySelector("#cart-list div");
const cart_list_empty = document.querySelector("#empty");
const container_product = document.querySelector("#container-product");
const icon_search = document.querySelector("#icon-search");
const input_search = document.querySelector("#search");
const close_cart = document.querySelector(".remove-back-button");
const cart_button = document.querySelector(".cart");

// funciones para filtrar productos, con Key ENTER y con icono lupa
const filterEnter = (e) => {
  if (e.key === "Enter") {
    const search = input_search.value.toLowerCase();
    const result = Productos.filter(
      (prod) => prod.name.toLowerCase().indexOf(search) > -1
    );
    let resultadoHTML = "";
    printProduct(result);
    input_search.value = "";
    $("#container-product").fadeIn();
  }
};
const filterIcon = () => {
  const search = input_search.value.toLowerCase();
  const result = Productos.filter(
    (prod) => prod.name.toLowerCase().indexOf(search) > -1
  );
  printProduct(result);
  input_search.value = "";
  $("#container-product").fadeIn();
};

//LISTENERS
icon_search.addEventListener("click", filterIcon);
input_search.addEventListener("keypress", filterEnter);
close_cart.addEventListener("click", closeCart);
container_product.addEventListener("click", (e) => {
  addCart(e);
  modalFuncion(e);
});

//funcion para agregar productos al carrito
const addCart = (e) => {
  if (e.target.classList.contains("button-buy")) {
    setCart(e.target.parentElement.parentElement);
    addCountPurchase();
  }
};
//Funcion modal se agrego producto al carrito
const modalFuncion = (e) => {
  if (e.target.classList.contains("button-buy")) {
    const modal_container = document.querySelector("#modal_container");
    const eliminarModal = () => {
      modal_container.classList.remove("show");
    };
    modal_container.classList.add("show");
    setTimeout(eliminarModal, 1500);
  }
};
//funcion aumentar cantidad de producto
const addAmountProduct = (e) => {
  if (e.target.id == "add-amount") {
    cart[e.target.parentElement.dataset.id].amount++;
    printCart();
    addCountPurchase();
  }
};
//funcion disminuir cantidad de producto
const discountAmountProduct = (e) => {
  if (e.target.id == "discount-amount") {
    cart[e.target.parentElement.dataset.id].amount--;
    printCart();
    discountCountPurchase();
    if (cart[e.target.parentElement.dataset.id].amount == 0) {
      console.log("hola");
      removeCartArticle(e);
    }
  }
};
//seteamos los elementos para enviarlos al carrito
const setCart = (obj) => {
  const product = {
    id: obj.querySelector(".button-buy").dataset.id,
    title: obj.querySelector("#name-product").textContent,
    price: obj.querySelector("#price-product").textContent,
    description: obj.querySelector("#name-product").textContent,
    img: obj.querySelector("img").getAttribute("src"),
    amount: 1,
  };

  //si existe un articulo con ese id actualiza la cantidad y el precio
  const numberPrice = Number(obj.querySelector("#price-product").textContent);
  if (cart.hasOwnProperty(product.id)) {
    product.amount = cart[product.id].amount + 1;
    product.price = product.amount * numberPrice;
    console.log(product.price);
  }
  cart[product.id] = { ...product };
  printCart();
};
//imprimir el carrito recorriendo objeto cart
const printCart = () => {
  //vaciar los div antes de insertar elementos
  cart_list.innerHTML = "";

  Object.values(cart).forEach((prod) => {
    //Etiqueta contenedora del articulo----------------------------------------
    const container_article = document.createElement("div");
    container_article.classList.add("container-article");
    //Etiqueta contenedora de la imagen del articulo---------------------------
    const article_img = document.createElement("div");
    article_img.classList.add("article-img");
    const img = document.createElement("img");
    img.src = prod.img;
    article_img.appendChild(img);
    //Etiqueta contenedora de informacion del articulo-------------------------
    const article_info = document.createElement("div");
    article_info.classList.add("article-info");
    const article_name = document.createElement("p");
    article_name.textContent = `${prod.title}`;
    article_info.appendChild(article_name);
    //Etiqueta precio del articulo-------------------------
    const article_price = document.createElement("p");
    article_price.textContent = `PRECIO:   ${prod.price}`;
    article_info.appendChild(article_price);
    //Etiqueta cantidad del articulo-------------------------
    const container_amount = document.createElement("div");
    container_amount.classList.add("container-amount");
    const article_amount = document.createElement("p");
    article_amount.textContent = ` CANTIDAD:   ${prod.amount}`;
    const add_amount_button = document.createElement("button");
    add_amount_button.classList.add("remove-back-button");
    add_amount_button.dataset.id = `${prod.id}`;
    const add_icon = document.createElement("i");
    add_icon.classList.add("fas", "fa-plus", "fa-2x");
    add_icon.id = "add-amount";
    add_amount_button.appendChild(add_icon);
    const discount_amount_button = document.createElement("button");
    discount_amount_button.classList.add("remove-back-button");
    discount_amount_button.dataset.id = `${prod.id}`;
    const discount_icon = document.createElement("i");
    discount_icon.classList.add("fas", "fa-minus", "fa-2x");
    discount_icon.id = "discount-amount";
    discount_amount_button.appendChild(discount_icon);

    container_amount.appendChild(article_amount);
    container_amount.appendChild(discount_amount_button);
    container_amount.appendChild(add_amount_button);
    article_info.appendChild(container_amount);
    add_amount_button.addEventListener("click", (e) => {
      addAmountProduct(e);
    });
    discount_amount_button.addEventListener("click", (e) => {
      discountAmountProduct(e);
    });

    //etiqueta contenedora de icono eliminar todos los productos del mismo tipo
    const remove_product = document.createElement("div");
    remove_product.classList.add("remove-product");
    const remove_button = document.createElement("button");
    remove_button.setAttribute("title", "Remove article");
    remove_button.classList.add("remove-back-button");
    remove_button.dataset.id = `${prod.id}`;
    const remove_icon = document.createElement("i");
    remove_icon.classList.add("fas", "fa-times", "fa-2x");
    remove_icon.id = "remove-cross";
    remove_button.appendChild(remove_icon);
    remove_product.appendChild(remove_button);
    remove_icon.addEventListener("click", (e) => {
      removeCartArticle(e);
    });

    //adjuntamos los elementos hijos al elemento padre
    container_article.appendChild(article_img);
    container_article.appendChild(article_info);
    container_article.appendChild(remove_product);
    cart_list.appendChild(container_article);

    //guardar los productos en localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  // crear boton vaciar carrito solo si hay productos
  if (Object.keys(cart).length > 0) {
    cart_list_empty.innerHTML = "";
    const container_empty = document.createElement("div");
    container_empty.classList.add("container-empty");
    const button_empty_cart = document.createElement("button");
    button_empty_cart.classList.add("button", "shadow-button");
    button_empty_cart.id = "btn-empty";
    button_empty_cart.textContent = "Empty cart";
    container_empty.appendChild(button_empty_cart);
    cart_list.appendChild(container_empty);

    // evento vaciar carrito
    const empty_cart = document.querySelector("#btn-empty");
    empty_cart.addEventListener("click", () => {
      cart = {};
      localStorage.setItem("cart", JSON.stringify(cart));
      printCart();
      removeAllCountPurchase();
    });
  } else {
    cart_list_empty.innerHTML = `<p id="empty">The shopping cart is empty</p>`;
  }
};

//funcion eliminar productos del mismo elemento
const removeCartArticle = (e) => {
  const article = cart[e.target.parentElement.dataset.id];
  count -= article.amount;
  localStorage.setItem("count", count);
  delete cart[e.target.parentElement.dataset.id];
  localStorage.setItem("cart", JSON.stringify(cart));
  printCart();
  printCountPurchase();
};

//contador del carrito de compras--------------------------------------------------------
let number = document.createElement("span");
number.classList.add("number");
const addCountPurchase = () => {
  count++;
  localStorage.setItem("count", count);
  printCountPurchase();
};
const discountCountPurchase = () => {
  count--;
  localStorage.setItem("count", count);
  printCountPurchase();
};
const removeAllCountPurchase = () => {
  count = 0;
  localStorage.setItem("count", count);
  printCountPurchase();
};

const printCountPurchase = () => {
  number.textContent = count;
  cart_button.appendChild(number);
};

// funciones para ordenar productos-----------------------------------
const sortAll = () => {
  printProduct(Productos);
  sort_by_price.checked = false;
  sort_by_alphabet.checked = false;
};
const sortXbox = () => {
  orderly = Productos.filter((prod) => prod.console == "xbox one");
  printProduct(orderly);
  sort_by_price.checked = false;
  sort_by_alphabet.checked = false;
};
const sortPlaystation = () => {
  orderly = Productos.filter((prod) => prod.console == "playstation 4");
  printProduct(orderly);
  sort_by_price.checked = false;
  sort_by_alphabet.checked = false;
};
const sortNintendo = () => {
  orderly = Productos.filter((prod) => prod.console == "nintendo");
  printProduct(orderly);
  sort_by_price.checked = false;
  sort_by_alphabet.checked = false;
};

const sortByPrice = () => {
  if (sort_xbox.checked || sort_playstation.checked) {
    orderly = orderly.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
    printProduct(orderly);
  } else {
    orderly = Productos.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
    printProduct(orderly);
  }
};
const sortByAlphabet = () => {
  if (sort_xbox.checked || sort_playstation.checked) {
    orderly = orderly.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    printProduct(orderly);
  } else {
    orderly = Productos.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    printProduct(orderly);
  }
};

const sort_all = document.querySelector("#sort-all");
sort_all.addEventListener("change", sortAll);
const sort_xbox = document.querySelector("#sort-xbox");
sort_xbox.addEventListener("change", sortXbox);
const sort_playstation = document.querySelector("#sort-playstation");
sort_playstation.addEventListener("change", sortPlaystation);
const sort_nintendo = document.querySelector("#sort-nintendo");
sort_nintendo.addEventListener("change", sortNintendo);
const sort_by_price = document.querySelector("#sort-price");
sort_by_price.addEventListener("change", sortByPrice);
const sort_by_alphabet = document.querySelector("#sort-alphabet");
sort_by_alphabet.addEventListener("change", sortByAlphabet);
