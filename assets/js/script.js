const cart = document.querySelector("#cart");
const template = document.querySelector("#template");
const footer = document.querySelector("footer");
const templateFooter = document.getElementById("footerTemplate");
const fragment = document.createDocumentFragment();

// delegando eventos, event listener botones
document.addEventListener("click", (e) => {
    if (e.target.matches(".btnAdd")) {
        addCart(e);
        // console.log("click");
    }

    // console.log(e.target.matches("#btnAddItem")); //con esto se comprueba la delegación de eventos para el botón Add (true)
    if (e.target.matches("#btnAddItem")) {
        btnAdd(e);
    }

    if (e.target.matches("#btnRemoveItem")) {
        btnRemove(e);
    }
});

let cartArray = [];

//agregar al carrito
const addCart = (e) => {
    const product = {
        title: e.target.dataset.fruit,
        id: e.target.dataset.fruit,
        price: parseInt(e.target.dataset.price),
        quantity: 1,
    };

    // buscamos índice
    const indice = cartArray.findIndex((item) => item.id === product.id);

    // si no existe, empujamos nuevo elemento
    if (indice === -1) {
        cartArray.push(product);
    }
    // en caso contrario, aumentamos cantidad
    else {
        cartArray[indice].quantity++;
        // cartArray[indice].price = cartArray[indice].quantity * product.price;
    }

    paintCart();
};

//pintar carrito
const paintCart = () => {
    cart.textContent = "";

    cartArray.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.title;
        clone.querySelector(".badge").textContent = item.quantity;
        clone.querySelector("#totalPrice").textContent =
            item.price * item.quantity;

        clone.querySelector("#btnAddItem").dataset.id = item.id;
        clone.querySelector("#btnRemoveItem").dataset.id = item.id;
        fragment.appendChild(clone);
    });

    cart.appendChild(fragment);
    // console.log(paintCart);

    paintFooter();
};

// pintar footer
const paintFooter = () => {
    // console.log("pintar footer");
    footer.textContent = "";

    const total = cartArray.reduce(
        (acc, current) => acc + current.quantity * current.price,
        0 // función callback, lo que queremos que devuelva
    );
    // console.log(total);

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("span").textContent = total;

    footer.appendChild(clone);
};

// botón agregar
const btnAdd = (e) => {
    // console.log("me diste click", e.target.dataset.id);
    cartArray = cartArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item; //si existe el item, agregamos
    });

    paintCart();
};

//botón remover
const btnRemove = (e) => {
    // console.log("me diste click", e.target.dataset.id);
    cartArray = cartArray.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.quantity > 0) {
                item.quantity--;
                if (item.quantity === 0) return;
                return item;
            }
        } else {
            return item;
        }
        //si la cantidad es mayor a 0, disminuimos, y cuando llega a 0, eliminamos pero retornamos el item
    });

    paintCart();
};
