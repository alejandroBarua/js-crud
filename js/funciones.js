//import ajax from "./XMLHttpRequest.js";
import ajax from "./fetch-async.js";
//import ajax from "./axios-async.js";

export const getAllBooks = () => {

    const $stock = document.querySelector(".stock"),
    $templateBook = document.getElementById("book-template").content;

    ajax({
        url: "http://localhost:3000/stock",
        success: (res) => {

            const sinLibros = () => {
                
                const $h2 = document.createElement("h2");
                $h2.classList.add("vacio");
                $h2.textContent = "(vacio)";
                document.querySelector(".title").after($h2);
            };

            if(res.length == 0) return sinLibros();
            
            const $fragment = document.createDocumentFragment();

            res.forEach(el => {

                $templateBook.querySelector("img").setAttribute("src", el.img_url);
                $templateBook.querySelector(".nombre").textContent = el.name;
                $templateBook.querySelector(".precio").textContent = `US$${el.value.toFixed(2)}`;

                $templateBook.querySelector(".editar").dataset.id = el.id;
                $templateBook.querySelector(".editar").dataset.nombre = el.name;
                $templateBook.querySelector(".editar").dataset.precio = el.value;
                $templateBook.querySelector(".editar").dataset.img = el.img_url;

                $templateBook.querySelector(".agregar").dataset.id = el.id;
                $templateBook.querySelector(".agregar").dataset.nombre = el.name;
                $templateBook.querySelector(".agregar").dataset.precio = el.value;
                $templateBook.querySelector(".agregar").dataset.img = el.img_url;

                let $clone = document.importNode($templateBook, true);
                $fragment.appendChild($clone)
            });

            $stock.appendChild($fragment);

        },
        error:(err) => {
            $stock.innerHTML = `<p> <b>${err}</b></p>`;
        } 
    });
};



export const getAllItems = () => {

    const $cart = document.querySelector(".items"),
    $templateItem = document.getElementById("item-template").content;

    ajax({
        url: "http://localhost:3000/cart",
        success: (res) => {

            if(res.length == 0) return $cart.innerHTML = `<h2 class="vacio">(Vacio)</h2>`

            const $fragment = document.createDocumentFragment();
    
            let total = 0;
            
                res.forEach(el => {

                    $templateItem.querySelector(".id").textContent = el.id;
                    $templateItem.querySelector(".nombre-table").textContent = el.name;
                    $templateItem.querySelector(".precio-table").textContent = `US$${el.value.toFixed(2)}`;

                    $templateItem.querySelector(".eliminar").dataset.id = el.id;
                    $templateItem.querySelector(".eliminar").dataset.nombre = el.name;
                    $templateItem.querySelector(".eliminar").dataset.precio = el.value;
                    $templateItem.querySelector(".eliminar").dataset.img = el.img_url;

                    total += el.value;
            
                    let $clone = document.importNode($templateItem, true);
                    $fragment.appendChild($clone)
                });

                $cart.appendChild($fragment);
                const $total = document.createElement("div");
                $total.classList.add("item");
                $total.innerHTML = `
                        <span></span>
                        <span></span>
                        <h3 class="total"></h3>`;

                $cart.appendChild($total);
                document.querySelector(".total").textContent = `US$${total.toFixed(2)}`;
        },
        error:(err) => {
            $cart.innerHTML = `<p> <b>${err}</b></p>`;
        } 
    });
};



const agregarDato = (base, name, value, img_url) => {

    ajax({
        url: `http://localhost:3000/${base}`,
        method: "POST",
        success: (res) => {

        },
        error:(err) => {
            $stock.innerHTML = `<p> <b>${err}</b></p>`;
        },
        data: {name, value, img_url} // no hace falta pasarle el id porque json server lo hace automaticamente
    });

};



export const eliminarDato = (base, $boton) => {

    let id = $boton.dataset.id,
        nombre = $boton.dataset.nombre,
        precio = parseFloat($boton.dataset.precio),
        imagen = $boton.dataset.img;

    ajax({
        url: `http://localhost:3000/${base}/${id}`,
        method: "DELETE",
        success: (res) => {
            (base == "stock")? base = "cart": base = "stock";
            agregarDato(base, nombre, precio, imagen);
        },
        error:(err) => {
            console.log('error');
        } 
    });
};


export const agregarActualizarPrecio = (e) => {
     
    let $editar = e.target,
            $div = document.querySelector(".actualizarPrecio");
        
        if($div == null) {
            $div = document.createElement("div");
            $div.classList.add("actualizarPrecio");
        }

        let id = $editar.dataset.id,
        nombre = $editar.dataset.nombre,
        precio = $editar.dataset.precio,
        imagen = $editar.dataset.img;

        $div.innerHTML = `
            <img class="imagen" src="${imagen}" alt="">

            <div>
                <h4 class="nombre">${nombre}</h4>
                <div>
                    <h3 class="precio">US$${precio}</h3>
                    <input type="text" name="precio" placeholder="Nuevo Precio" 
                    class="nuevoPrecio" pattern="^([0-9]*[.])?[0-9]+">
                </div>
                <div>
                    <button class="cancelar">Cancelar</button>
                    <button class="actualizar">Actualizar</button>
                </div>
            </div>`;

        document.querySelector(".title").after($div);

        document.querySelector(".actualizar").dataset.id = id;
        document.querySelector(".actualizar").dataset.nombre = nombre;
        document.querySelector(".actualizar").dataset.img = imagen;
}




export const actualizarPrecio = (e) => {
    
    const $input = document.querySelector(".nuevoPrecio");
        
        if($input.value == "") $input.classList.add("is-active");
        if($input.classList.contains("is-active")) return console.log('error');

        const $actualizar = e.target;

        let id = $actualizar.dataset.id,
        name = $actualizar.dataset.nombre,
        img_url = $actualizar.dataset.img,
        value = parseFloat(document.querySelector(".nuevoPrecio").value);

        ajax({
        url: `http://localhost:3000/stock/${id}`,
        method: "PUT",
        success: (res) => {
            
        },
        error:(err) => {
            console.log('error');
        },
        data: {id, name, value, img_url}
    });
}
