var api = "https://persister-json-server.herokuapp.com"

export const fetchData = async (url) => {
    const response = await fetch(api + url).then(res => {
        return res.json()
    })
    return response
}

export const URLsearch = (parameter) => {
    let params = new URLSearchParams(location.search);
    if(params.get(parameter) != null)
        return params.get(parameter)
    else
        return false
}

export const postData = async (url, payload) => {
    await fetch(api + url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

export const deleteData = async (url) => {
    await fetch(api + url, {
        method: "DELETE"
    })
}

export const updateData = async (url, payload) => {
    await fetch(api + url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    })
}