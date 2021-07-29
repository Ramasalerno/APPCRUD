// Clases

class Product {
    constructor(name, price, sku) {
        this.name = name;
        this.price = price;
        this.sku = sku;
    }
}

class UI {
    addProduct(product) {
        const $productList = document.getElementById("product-list");
        const $element = document.createElement("div");
        $element.innerHTML = `
        <div class = "card text-center mb-3">
            <div class = "card-body">
                <strong>Producto</strong>: ${product.name}
                <strong>Precio del producto</strong>: ${product.price}
                <strong>Numero de parte</strong>: ${product.sku}
                <a href ="#" class="btn btn-danger" name="delete">Eliminar</a>
            </div>
        </div>`

        $productList.appendChild($element);
    }

    resetForm() {
        //metodo .reset para el formulario
        document.getElementById("product-form").reset();
    }

    deleteProduct($element) {
        if ($element.name === "delete") {
            $element.parentElement.parentElement.parentElement.remove();
            this.showMessage("Producto eliminado correctamente", "danger")
        }

    }

    showMessage(message, cssClass) {
        const $div = document.createElement("div");
        //colocando clase al div
        $div.className = `alert alert-${cssClass} mt-2`;
        $div.appendChild(document.createTextNode(message));
        //mostrando en el DOM
        const $container = document.querySelector(".container");
        const $app = document.querySelector("#App");
        $container.insertBefore($div, $app);

        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);

    }
}

// DOM

document.getElementById("product-form")
    .addEventListener('submit', function (e) {
        const $name = document.getElementById("name").value;
        const $price = document.getElementById("price").value;
        const $sku = document.getElementById("sku").value;
        //generamos el objeto en base a las constantes anteriores
        const product = new Product($name, $price, $sku);

        
        const ui = new UI();

        if($name === "" || $price === "" || $sku === "") {
            return ui.showMessage("Completa los campos, por favor", 'danger');
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage("Producto agregado correctamente", 'success');
        //previene el comportamiento por defecto
        e.preventDefault();
    });

document.getElementById("product-list").addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
})