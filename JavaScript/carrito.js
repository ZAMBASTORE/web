
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        if (cartCount) cartCount.textContent = cart.length;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(product) {
        cart.push(product);
        saveCart();
        updateCartCount();
        alert("Producto agregado al carrito: " + product.name);
    }

    function getPriceFromText(text) {
        const match = text.match(/(\d+[.,]?\d*)/);
        return match ? parseFloat(match[1].replace(",", "")) : 0;
    }

    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const parent = button.closest("div");
            const name = parent.querySelector("h3")?.textContent || "Producto";
            const priceText = parent.querySelectorAll("p")[1]?.textContent || "";
            const price = getPriceFromText(priceText);
            const product = { name, price };
            addToCart(product);
        });
    });

    // Crear el icono del carrito
    const cartIcon = document.createElement("div");
    cartIcon.id = "cart-icon";
    cartIcon.innerHTML = '🛒 <span id="cart-count">0</span>';
    Object.assign(cartIcon.style, {
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "#b30000",
        color: "white",
        padding: "10px 15px",
        borderRadius: "30px",
        cursor: "pointer",
        zIndex: "10000"
    });
    document.body.appendChild(cartIcon);

    // Crear panel del carrito
    const cartPanel = document.createElement("div");
    cartPanel.id = "cart-panel";
    Object.assign(cartPanel.style, {
        position: "fixed",
        top: "60px",
        right: "10px",
        width: "300px",
        maxHeight: "400px",
        overflowY: "auto",
        backgroundColor: "white",
        color: "#333",
        border: "2px solid #b30000",
        borderRadius: "10px",
        padding: "15px",
        display: "none",
        zIndex: "9999"
    });
    cartPanel.innerHTML = `
        <h3>Tu Carrito</h3>
        <ul id="cart-items" style="list-style:none; padding-left:0;"></ul>
        <p><strong>Total:</strong> $<span id="cart-total">0</span></p>
        <button id="clear-cart" style="background:#b30000; color:white; border:none; padding:5px 10px; cursor:pointer;">Vaciar Carrito</button>
    `;
    document.body.appendChild(cartPanel);

    function renderCart() {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price}`;
            li.style.marginBottom = "5px";
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    document.getElementById("clear-cart").addEventListener("click", () => {
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
    });

    cartIcon.addEventListener("click", () => {
        const panel = document.getElementById("cart-panel");
        panel.style.display = panel.style.display === "none" ? "block" : "none";
        renderCart();
    });

    updateCartCount();
});
