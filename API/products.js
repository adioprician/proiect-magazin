 const url = "https://668d7a50099db4c579f31778.mockapi.io/products"


 export async function getAllProducts() {
   const response = await fetch(url);
   const products = await response.json();

   console.log(response, products);

   return products;
   
}
