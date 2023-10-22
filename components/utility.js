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

export function toCurrency(amount,locale,currency){
    return amount.toLocaleString(locale,{
        style:"currency",
        currency:currency,
    })
}

export function indianCurrencyFormat(amount) {
    let currency = String(amount).replace(/[^0-9.]/g, '')
    for (let i = currency.length-3 ; i > 0; i -= 2) {
        currency = currency.slice(0,i) + ' ' + currency.slice(i)      
    }
    return currency
}