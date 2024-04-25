export const addProduct = async (name, buyPrice, sellPrice, categoryId) => {
    const response = await fetch("/addProduct", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: 0,
            name: name,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            categoryId: categoryId
        })
    });

    const message = await response.json();
}