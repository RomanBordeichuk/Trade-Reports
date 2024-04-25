export const loadOrderInfo = async (today) => {
    const response = await fetch("/loadOrderInfo", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type":"application/json" },
        body: JSON.stringify(today)
    });

    const message = await response.json();

    return [message.clientNum, message.managerPayValue];
}
