import { getAllProducts } from './API/products.js';
import { mapProductToCard } from './utils/layout.js';

document.addEventListener('DOMContentLoaded', displayAllProducts);
const mainContainer = document.querySelector('.main');


async function displayAllProducts() {
	const products = await getAllProducts();
	mainContainer.innerHTML = products.map(mapProductToCard).join(' ');

	const addToCartButtons = document.querySelectorAll('.add-to-cart');

	addToCartButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.getAttribute('data-id');
			const price = button.getAttribute('data-price');
			const name = button.getAttribute('data-name');
			const imageUrl = button.getAttribute('data-image');
            const category = button.getAttribute('data-category');

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
				};
			}

			localStorage.setItem('cart', JSON.stringify(cart));
		});
	});

    
}