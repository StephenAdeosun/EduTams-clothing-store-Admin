function displayProducts(products) {
    const productDisplay = document.getElementById('product-display');
    productDisplay.innerHTML = '';

    products.forEach(product => {
      productDisplay.innerHTML += `
        <div class="col">
          <div class="card product-card">
            <img src="${product.image}" alt="${product.title}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-price">Price: $${product.price}</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  function searchProducts() {
    const searchQuery = document.getElementById('search-input').value;

    if (searchQuery.trim() === '') {
      fetchProducts();
    } else {
      const searchUrl = `https://fakestoreapi.com/products?title=${searchQuery}`;
      fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
          displayProducts(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', searchProducts);