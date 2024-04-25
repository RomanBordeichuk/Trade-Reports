export const loadDaysList = async (monthId) => {
    const response = await fetch("/loadDaysList", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: monthId,
            month: [],
            daysList: []
        })
    }); 

    return await response.json();
}
