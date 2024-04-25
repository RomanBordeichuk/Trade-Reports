export const setDollarCourse = async (dollarBuyPrice) => {
    const response = await fetch("/setDollarCourse", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify(dollarBuyPrice)
    }); 

    const message = await response.json();
}