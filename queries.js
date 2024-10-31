 export async function getRates(searchValue = '', limit = 8){ 
    const res = await fetch(`https://api.coincap.io/v2/assets?search=${searchValue}&limit=${limit}`);
    const json = await res.json();
    return json;
  }


