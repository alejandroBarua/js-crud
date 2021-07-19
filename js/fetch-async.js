// fetch-async

export default async function ajax({url, method, success, error, data}){

    let options = {
        method,
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    };
    
    try{
        
        let res = await fetch(url, options),
            json = await res.json();

            
        if(!res.ok) throw { status:res.status, statusText:res.statusText }
        //location.reload(); // para actulizar la interfaz en una API real

        success(json);

    }catch(err){

        let message = err.statusText || "ocurrio un error";
        error(`Error ${err.status}: ${message}`);
    }

}