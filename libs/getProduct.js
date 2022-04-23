async function getProducts(uid) {
    const res = await fetch(
      `https://storefront-14ded-default-rtdb.firebaseio.com/products/${uid}.json`
    );
    const data = await res.json();
    return data;
  }
  
  export { getProducts };