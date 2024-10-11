// Select DOM elements
const form = document.getElementById('form');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMessage = document.querySelector('.empty-cart');

// Initialize cart as an empty array
let cart = [];

// Handle form submission
form.addEventListener('submit', e => {
    e.preventDefault();
    checkInput();
});

// Function to validate input
function checkInput() {
    const userNameValue = userName.value.trim();
    const userEmailValue = userEmail.value.trim();

    if (userEmailValue === "") {
        setError(userEmail, 'Email cannot be blank');
    } else {
        setSuccess(userEmail);
        // Optionally, you can add logic for successful submission
    }

    if (userNameValue === "") {
        setError(userName, 'Username cannot be blank');
    } else {
        setSuccess(userName);
    }
}

// Function to set error message
function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    small.classList.add('setError');
}

// Function to set success message
function setSuccess(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = '';
    small.classList.remove('setError');
}

// Function to add product to cart
function addToCart(product) {
    cart.push(product);
    displayCartItems();
}

// Function to display cart items
function displayCartItems() {
    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        // Show empty cart message
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        
        // Loop through the cart and create item elements
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h5>${item.name}</h5>
                    <p>Price: ₹${item.price}</p>
                </div>
            `;

            // Append the cart item to the cart items container
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }
}

// Example of adding products (you can call this function when the Add To Cart button is clicked)
document.querySelectorAll('.addcart').forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior (scrolling to top)

        const productName = button.previousElementSibling.innerText; // Get product name from card
        const productPrice = parseInt(productName.match(/₹(\d+)/)[1]); // Extract price from the text
        const productImage = button.closest('.card').querySelector('.card-img-top').src; // Get image src

        const product = {
            name: productName.split('-')[0].trim(), // Get only product name
            price: productPrice,
            image: productImage
        };

        addToCart(product); // Add the product to the cart
    });
});
