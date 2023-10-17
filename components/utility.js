export async function fetchReq(api, options = {method : 'GET'} ) {
    const res = await fetch(api,options)
    console.log(res);
    const data = await res.json()

    if (!res.ok) {
        throw {
            message : data.message,
            statusText : res.statusText,
            status : res.status
        }
    }

    return data
}