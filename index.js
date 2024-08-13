import { getAllProducts } from './API/products.js';
import { mapProductToCard } from './utils/layout.js';

document.addEventListener('DOMContentLoaded', displayAllProducts);
const mainContainer = document.querySelector('.main');


async function displayAllProducts() {
	const products = await getAllProducts();
	mainContainer.innerHTML = products.map(mapProductToCard).join(' ');

	const addToCartButtons = document.querySelectorAll('.add-to-cart');

	addToCartButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const button = e.target.closest('button');
			const productId = button.getAttribute('data-id');
			const price = button.getAttribute('data-price');
			const name = button.getAttribute('data-name');
			const imageUrl = button.getAttribute('data-image');
			const category = button.getAttribute('data-category');
			const stock = button.getAttribute('data-stock');


            let clicks = parseInt(button.getAttribute('data-clicks'), 3);

            clicks += 1;
            button.setAttribute('data-clicks', clicks);

            if (clicks == 3) {
                button.disabled = true;
                button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Added 3 Times';
                button.classList.add('disabled-button');
            }

			let cart = JSON.parse(localStorage.getItem('cart')) || {};
			
			if (cart[productId]) {
				cart[productId].quantity += 1;
			} else {
				cart[productId] = {
					quantity: 1,
					price: price,
					name: name,
					imageUrl: imageUrl,
                    category: category,
					stock: stock,
				};
			}
			// console.log(cart);
			localStorage.setItem('cart', JSON.stringify(cart));
		});
	});

    
}