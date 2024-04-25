export const deleteProduct = async (id) => {
    const response = await fetch("/deleteProduct", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: id,
            name: "",
            buyPrice: 0,
            sellPrice: 0,
            categoryId: 0
        })
    });

    const message = await response.json();
}
