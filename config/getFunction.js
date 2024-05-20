const GET = async (url) => {
    let apiReq = await fetch(url);
    let apiRes = await apiReq.json();
    return apiRes;
}

export {GET};