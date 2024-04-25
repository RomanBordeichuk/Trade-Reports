export const updateCategory = async (id, name) => {
    const response = await fetch("/updateCategory", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: id,
            name: name,
            products: []
        })
    });

    const message = await response.json();
}