import { getAllBooks, getAllItems, eliminarDato, agregarActualizarPrecio, actualizarPrecio } from "./funciones.js";


document.addEventListener("DOMContentLoaded", e =>{
    
    getAllBooks();
    getAllItems();

});


document.addEventListener("click", e => {
    
    if (e.target.matches(".agregar")) {

        let base = "stock";
        eliminarDato(base, e.target);
    }

    if (e.target.matches(".eliminar")) {
        let base = "cart";
        eliminarDato(base, e.target);
    }

    if(e.target.matches(".editar")){
        
       agregarActualizarPrecio(e);
    }

    if(e.target.matches(".actualizar")){

        actualizarPrecio(e);
    }

    if(e.target.matches(".cancelar")){
    
        const $container = document.querySelector(".container"),
            $actualizarPrecio = document.querySelector(".actualizarPrecio");
        
        $container.removeChild($actualizarPrecio);
    }
});


document.addEventListener("keyup", e => {

        if(e.target.matches(".nuevoPrecio")){

            let $input = e.target,
                pattern = $input.pattern;
            

            let regex = new RegExp(pattern);
            
            return !regex.exec($input.value)
                ? $input.classList.add("is-active")
                : $input.classList.remove("is-active");
        }
});