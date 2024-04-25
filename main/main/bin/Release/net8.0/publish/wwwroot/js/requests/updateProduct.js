export const updateProduct = async (id, name, sellPrice, buyPrice) => {
    const response = await fetch("/updateProduct", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: id,
            name: name,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            categoryId: 0
        })
    });

    const message = await response.json();
}
