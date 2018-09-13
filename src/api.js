async function getResponse(res) {
  return res.ok ? {result: await res.json()}: {error:res.statusText}
}
async function getBeers(page, per_page) {
  try {
    const res = await fetch(`http://localhost:3002/api/beers?page=${page}&per_page=${per_page}`);
    return await getResponse(res);
  }
  catch(error){
    console.log("Bad Network", error)
    return {error:"Could not fetch beers"}
  }
}

async function setFavorite(id) {
  try {
    const res = await fetch(`http://localhost:3002/api/beers/${id}/favorites`, { method: "POST"})
    return await getResponse(res);
  }
  catch(error) {
    console.log("Could not set or unset favorite beer",error);
    return {error:"Could not set or unset favorite beer"}
  }
}

async function getFavoriteBeers(page, per_page) {
  try {
    const res = await fetch(`http://localhost:3002/api/beers/favorites?page=${page}&per_page=${per_page}`);
    return await getResponse(res);
  }
  catch(error){
    console.log("Bad Network", error)
    return {error:"Could not fetch beers"}
  }
}

export {
  getBeers,
  setFavorite,
  getFavoriteBeers
}
