// XMLHttpRequest

export default function ajax(options){

    let {url, method, success, error, data} = options;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", e => {

        if(xhr.readyState !== 4) return;

        if(xhr.status >= 200 && xhr.status < 300){

            let json = JSON.parse(xhr.responseText);
            //location.reload(); // para actulizar la interfaz en una API real
           
            success(json);
        }
        else{
            
            let message = xhr.statusText || "ocurrio un error";

            error(`Error ${xhr.status}: ${message}`);
        }

    });

    xhr.open(method ||"GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));

}