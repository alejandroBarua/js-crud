// axios-async

export default async function ajax({url, method, success, error, data}){

    let options = {
        method,
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(data)
    };

    try {
        
        let res = await axios(url, options),
            json = await res.data;

        //location.reload();
        success(json);

    } catch (err) {
        
        let message = err.response.statusText || "ocurrio un error";
        error(`Error ${err.response.status}: ${message}`);            

    }
}