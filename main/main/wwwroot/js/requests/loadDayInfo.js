export const loadDayInfo = async (dayId) => {
    const response = await fetch("/loadDayInfo", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: dayId,
            monthId: 0,
            date: [],
            orderList: []
        })
    }); 

    return await response.json();
}
