
export async function formSubmit(url, formData){
    let formBody = getUrlEncoded(formData);
    return fetch(url, {
        method: 'POST',
        headers:{
            'Content-type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formBody
    });
}

function getUrlEncoded(formData){
    let formBody = [];
    for(let element in formData){
        let key = encodeURIComponent(element);
        let value = encodeURIComponent(formData[element]);
        formBody.push(key + "=" + value);
    }
    formBody = formBody.join('&');
    return formBody;
}
