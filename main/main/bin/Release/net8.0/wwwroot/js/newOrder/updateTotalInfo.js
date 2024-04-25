export const updateTotalInfo = (choosenProductsList) => {
    let managerPaymentInput = document.querySelector(".top_block .manager_payment_input");
    
    let totalSellPriceObj = document.querySelector(".total_info_block .sell_price");
    let totalBuyPriceObj = document.querySelector(".total_info_block .buy_price");
    let totalIncomeObj = document.querySelector(".total_info_block .income");

    // перераховуємо загальні дані по замовлення через список вибраних товарів
    
    let totalSellPrice = 0;
    let totalBuyPrice = 0;
    let totalIncome = 0;

    for(let i = 0; i < choosenProductsList.length; i++){
        let sellPrice = choosenProductsList[i].sellPrice * choosenProductsList[i].num;
        let buyPrice = choosenProductsList[i].buyPrice * choosenProductsList[i].num;

        totalIncome += sellPrice - buyPrice 
            - managerPaymentInput.value * choosenProductsList[i].num;
        totalSellPrice += sellPrice;
        totalBuyPrice += buyPrice;
    }

    totalSellPriceObj.innerText = totalSellPrice;
    totalBuyPriceObj.innerText = totalBuyPrice;
    totalIncomeObj.innerText = totalIncome;
}
