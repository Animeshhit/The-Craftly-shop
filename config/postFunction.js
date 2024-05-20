const POST = async (url,body) => {
    let apiReq = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    });
    return await apiReq.json();
}



export {POST};