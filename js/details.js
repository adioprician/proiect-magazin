document.addEventListener('DOMContentLoaded', showProductDetails);

 const url = "https://668d7a50099db4c579f31778.mockapi.io/products";

async function showProductDetails() {
    const urlSearchParam = new URLSearchParams(window.location.search);
    const productId = urlSearchParam.get('id');

    const response = await fetch(`${url}/${productId}`);
    const product = await response.json();

    document.querySelector('.main').innerHTML = `<h2>${product.name}<br> <img src=${product.imageUrl} width="500vh"/>  <br>${product.details} <br> Produse disponibile: ${product.stock} Buc.</h2> `;


}