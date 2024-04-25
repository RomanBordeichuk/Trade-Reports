export const addCategory = async (name) => {
    const response = await fetch("/addCategory", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: 0,
            name: name,
            products: []
        })
    });

    const message = await response.json();
    return message.id;
}
