export async function fetchReq(api, options = {method : 'GET'} ) {
    const res = await fetch(api,options)
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

export function loadScript(src) {
    return new Promise ((res, rej) => {
        const script = document.createElement("script")
        script.src = src
        document.body.appendChild(script)
        script.onload  = () => ( res(true) )
        script.onerror = () => ( rej(false) )
    })
}