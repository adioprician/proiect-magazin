const url = "https://668d7a50099db4c579f31778.mockapi.io/products";


const productsTableBody = document
.getElementById('products-table')
.querySelector('tbody');


document.addEventListener('DOMContentLoaded', displayAllProducts);

function getAllProducts(){
    return fetch(url).then(response => response.json());
} 
function displayAllProducts() {
    getAllProducts().then(products => {
        productsTableBody.innerHTML = products.map(
            (product) => `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
              aici nu stiu  // <img src="${product.image}" alt="${product.name}">//
                </td>   
                <td>${product.category}</td>
                <td>
                    <button>
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>    
                </td>
                <td>
                    <button>
                       <i class="fa-solid fa-trash"></i>
                    </button>    
                </td>
            </tr>
            `)
            .join('');
    })
} 

const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('image-url');
const detailsInput = document.getElementById('details');
const categoryInput = document.getElementById('category');
const saveProductButton = document.getElementById('save-btn');


saveProductButton.addEventListener('click', saveProduct);

console.log(nameInput, priceInput, imageUrlInput, detailsInput, categoryInput);

function saveProduct(event) {
    event.preventDefault();

    const product = {
        name: nameInput.value,
        price: Number(priceInput.value),
        imageUrl: imageUrlInput.value,
        details: detailsInput.value,
        category: categoryInput.value,
    };

    console.log(JSON.stringify(product),product);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then(() => {
        form.reset();
        displayAllProducts();
    })
}