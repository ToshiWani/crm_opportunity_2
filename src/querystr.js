
export default function getIds(url){
    let regex = /(\?|\&)([^=]+)\=([^\&]+)/gi;
    let queryStr = url.match(regex);
    let result = [];

    queryStr.map(qs=>{
        qs = qs.replace("&", "");
        qs = qs.replace("?", "");
        let kvp = qs.split("=");
        if (kvp[0] === "id"){
            result.push(kvp[1]);
        }
    });

    return result;
}