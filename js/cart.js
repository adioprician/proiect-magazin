import { getProductById } from '../API/products.js';



document.addEventListener('DOMContentLoaded', () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	const cartItemsContainer = document.querySelector('.cart-items');
	const cartTotalContainer = document.querySelector('.cart-total');

	function updateCart() {
		cartItemsContainer.innerHTML = '';
		let total = 0;

		for (let id in cart) {
			const product =  cart[id];			

			const productCard = document.createElement('div');
			productCard.className =
				'flex justify-between items-center border-bottom ';
				//aici cu w-300 nu se aseaza frumos in pagina. w-300 aveam sus de la curs
			const descreaseDisabled = product.quantity === 1 ? 'disabled' : '';
			const increaseDisabled = product.quantity === 3 ? 'disabled' : '';
			productCard.innerHTML = `
			<img width="60px" src=${product.imageUrl} />
				<div class="w-150  flex  gap-20 justify-between items-center">
            		<span>${product.name}</span>
            		<div class="flex">
						<button data-id=${id} ${descreaseDisabled} class="decrease">-</button>
						<span>${product.quantity}</span>
						<button data-id=${id} ${increaseDisabled} class="increase">+</button>
            		</div>
				</div>
				<span>${product.price * product.quantity} Euro </span>
				<button data-id=${id} class="delete">Sterge</button>
         `;
		 total = total + product.price * product.quantity;
		 cartItemsContainer.appendChild(productCard);
	 }
		 
		cartTotalContainer.innerHTML = total === 0 ? 'Cosul de cumparaturi este gol.' : `Total: ${total}`;
	}
	
	cartItemsContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('increase')) {
			const id = e.target.getAttribute('data-id');
			cart[id].quantity += 1;
			console.log(cart[id]);
		} else if (e.target.classList.contains('decrease')) {
			const id = e.target.getAttribute('data-id');
			cart[id].quantity -= 1;
		} else if (e.target.classList.contains('delete')) {
			const id = e.target.getAttribute('data-id');
			delete cart[id];
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		updateCart();
	});

	updateCart();
});