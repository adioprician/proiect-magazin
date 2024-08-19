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
			const stock = parseInt(button.getAttribute('data-stock'), 10);

			let cart = JSON.parse(localStorage.getItem('cart')) || {};

			let currentQuantity = cart[productId] ? cart[productId].quantity : 0;

			let clicks = parseInt(button.getAttribute('data-clicks'), 10) || 0;
			clicks += 1;

			if (currentQuantity + 1 > stock) {
				alert(`Nu poți adăuga mai mult de ${stock} produse în coș.`);
				button.disabled = true;
				button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Stoc epuizat';
				button.classList.add('disabled-button');
				return;
			}

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

			localStorage.setItem('cart', JSON.stringify(cart));

			button.setAttribute('data-clicks', clicks);
			if (cart[productId].quantity >= stock) {
				button.disabled = true;
				button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Stoc epuizat';
				button.classList.add('disabled-button');
			}
		});
	});
}
