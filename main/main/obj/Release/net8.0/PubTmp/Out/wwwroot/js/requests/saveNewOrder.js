export const saveNewOrder = async (date, managerPayValue, productsList, totalSellPrice, 
    totalBuyPrice, totalIncome) => {
    let clientNumObj = document.querySelector(".top_block .client_num_value");

    const response = await fetch("/saveNewOrder", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            id: 0,
            dayId: 0,
            clientNum: +clientNumObj.innerText,
            date: date,
            managerPayValue: managerPayValue,
            productsList, productsList,
            totalSellPrice: totalSellPrice,
            totalBuyPrice: totalBuyPrice,
            totalIncome: totalIncome
        })
    }); 

    const message = await response.json();
}
