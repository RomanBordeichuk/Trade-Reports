export const calculateTotalOrderInfo = (managerPayValue, productsList) => {
    let count = 0;

    let totalSellPrice = 0;
    productsList.forEach(product => {
        totalSellPrice += product.sellPrice * product.num;
        count += product.num;
    });

    let totalBuyPrice = 0;
    productsList.forEach(product => {
        totalBuyPrice += product.buyPrice * product.num;
    });

    let totalIncome = totalSellPrice - totalBuyPrice - managerPayValue * count;

    totalSellPrice = Math.round(totalSellPrice * 100) / 100;
    totalBuyPrice = Math.round(totalBuyPrice * 100) / 100;
    totalIncome = Math.round(totalIncome * 100) / 100;

    return [totalSellPrice, totalBuyPrice, totalIncome];
}
