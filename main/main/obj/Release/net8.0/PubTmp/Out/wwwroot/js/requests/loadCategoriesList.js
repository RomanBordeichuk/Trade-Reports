export const loadCategoriesList = async () => {
    const response =  await fetch("/loadCategoriesList", {
        method: "GET",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify()
    }); 

    return await response.json();
}
