export const loadMonthList = async () => {
    const response = await fetch("/loadMonthList", {
        method: "GET",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify()
    }); 

    return await response.json();
}
