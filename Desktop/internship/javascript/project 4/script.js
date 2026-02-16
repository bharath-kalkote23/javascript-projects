let selectedSize = null;
let quantity = 1;

const sizeButtons = document.querySelectorAll(".size-btn");
const qtyInput = document.getElementById("qty");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const addToCartBtn = document.getElementById("addToCart");
const cartCount = document.getElementById("cartCount");

updateCartCount();

/* Size Selection */
sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
        sizeButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedSize = button.textContent;
    });
});

/* Increase Quantity */
plusBtn.addEventListener("click", () => {
    quantity++;
    qtyInput.value = quantity;
});

/* Decrease Quantity */
minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
    }
});

/* Add To Cart */
addToCartBtn.addEventListener("click", () => {

    if (!selectedSize) {
        alert("Please select a size");
        return;
    }

    const product = {
        name: "Premium Leather Sneakers",
        price: 149.99,
        size: selectedSize,
        quantity: quantity
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Product added to cart!");
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
}
