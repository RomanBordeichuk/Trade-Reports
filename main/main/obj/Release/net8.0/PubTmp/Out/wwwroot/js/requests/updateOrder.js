export const updateOrder = async (id, managerPayValue, productsList, 
    totalSellPrice, totalBuyPrice, totalIncome) => {
    const response = await fetch("/updateOrder", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: id,
            dayId: 0,
            clientNum: 0,
            date: [],
            managerPayValue: managerPayValue,
            productsList: productsList,
            totalSellPrice: totalSellPrice,
            totalBuyPrice: totalBuyPrice,
            totalIncome: totalIncome
        })
    }); 

    return await response.json();
}
