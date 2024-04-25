export const calculateDayStatsInfo = (statisticsObj, orderList, dollarCourse) => {
    let numClients = 0;
    let numProducts = 0;
    let avOrderIncome = 0;
    let avProductIncome = 0;
    let totalIncome = 0;
    let totalSellPrice = 0;

    for(let k = 0; k < orderList.length; k++){
        numClients++;
        totalIncome += orderList[k].totalIncome;
        totalSellPrice += orderList[k].totalSellPrice;

        for(let l = 0; l < orderList[k].productsList.length; l++){
            numProducts += orderList[k].productsList[l].num;
        }
    }

    totalIncome = Math.round(totalIncome / dollarCourse * 100) / 100;
    totalSellPrice = Math.round(totalSellPrice / dollarCourse * 100) / 100;

    avOrderIncome = Math.round(totalIncome / numClients * 100) / 100;
    avProductIncome = Math.round(totalIncome / numProducts * 100) / 100;

    statisticsObj.querySelector(".num_clients_value").innerText = numClients;
    statisticsObj.querySelector(".num_products_value").innerText = numProducts;
    statisticsObj.querySelector(".av_client_income_value").innerText = avOrderIncome;
    statisticsObj.querySelector(".av_product_income_value").innerText = avProductIncome;
    statisticsObj.querySelector(".sum_income_value").innerText = totalIncome;
    statisticsObj.querySelector(".sum_bill_value").innerText = totalSellPrice;
}