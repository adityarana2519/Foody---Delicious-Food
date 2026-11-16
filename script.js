    // Search Functionality

    let searchInput = document.getElementById("searchInput");
    let foodItems = document.querySelectorAll(".food-item");
    let noResults = document.getElementById("noResults");

    function searchFood() {

        let searchValue = searchInput.value.toLowerCase().trim();
        let found = 0;

        foodItems.forEach(function(item) {

            let foodName = item.getAttribute("data-name");

            if(foodName.includes(searchValue)) {
                item.style.display = "";
                found++;
            }
            else {
                item.style.display = "none";
            }

        });

        noResults.style.display = found === 0 ? "block" : "none";

    }

    searchInput.addEventListener("input", searchFood);

    document.getElementById("searchForm").addEventListener("submit", function(e) {
        e.preventDefault();
        searchFood();
        document.getElementById("menu").scrollIntoView({
            behavior: "smooth"
        });
    });


    // Cart Functionality

    let cart = [];

    let cartCount = document.getElementById("cartCount");
    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    let addButtons = document.querySelectorAll(".add-cart");

    addButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            let name = button.getAttribute("data-name");
            let price = Number(button.getAttribute("data-price"));

            let existingItem = cart.find(function(item) {
                return item.name === name;
            });

            if(existingItem) {
                existingItem.quantity++;
            }
            else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            updateCart();

        });

    });


    // Update Cart

    function updateCart() {

        let totalItems = 0;
        let totalPrice = 0;

        cartItems.innerHTML = "";

        if(cart.length === 0) {
            cartItems.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
        }

        cart.forEach(function(item, index) {

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            cartItems.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-3">

                    <div>
                        <h6>${item.name}</h6>
                        <p class="mb-0 text-muted">
                            ₹${item.price} x ${item.quantity}
                        </p>
                    </div>

                    <div>
                        <button class="btn btn-sm btn-outline-danger"
                            onclick="removeItem(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>

                </div>
            `;

        });

        cartCount.innerText = totalItems;
        cartTotal.innerText = "₹" + totalPrice;

    }


    // Remove Item

    function removeItem(index) {

        cart.splice(index, 1);
        updateCart();

    }


    // Checkout

    document.getElementById("checkoutBtn").addEventListener("click", function() {

        if(cart.length === 0) {
            alert("Your cart is empty!");
        }
        else {
            alert("Order placed successfully! (Demo only)");
            cart = [];
            updateCart();

            let cartPanel = bootstrap.Offcanvas.getInstance(
                document.getElementById("cartPanel")
            );

            cartPanel.hide();
        }

    });