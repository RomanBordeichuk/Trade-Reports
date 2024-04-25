import { calculateTotalOrderInfo } from "./calculateTotalOrderInfo.js";

export const handleDeleteOrderProductEventListeners = (
    clientObj, productsList) => {
    let productObjList = clientObj.querySelectorAll(".product");
    for(let i = 0; i < productObjList.length; i++){
        let managerPayValue = +clientObj.querySelector(".top_block input").value;
        
        function handleDeleteOrderProductEventListener(){
            productsList.splice(i, 1);
            productObjList[i].remove();
            productObjList = clientObj.querySelectorAll(".product");

            // оновлюємо загальні дані по замовленню

            let totalSellPrice = 0;
            let totalBuyPrice = 0;
            let totalIncome = 0;

            [totalSellPrice, totalBuyPrice, totalIncome] = 
                calculateTotalOrderInfo(managerPayValue, productsList);
            
            clientObj.querySelector(
                ".total_info_block .sum_bill_value").innerText = totalSellPrice;
            clientObj.querySelector(
                ".total_info_block .sum_price_value").innerText = totalBuyPrice;
            clientObj.querySelector(
                ".total_info_block .income_value").innerText = totalIncome;

            handleDeleteOrderProductEventListeners(clientObj, productsList);
        }

        let deleteButtonObjList = productObjList[i].querySelector(".edit_block");

        deleteButtonObjList.removeEventListener("click", handleDeleteOrderProductEventListener);
        deleteButtonObjList.addEventListener("click", handleDeleteOrderProductEventListener);
    }
}