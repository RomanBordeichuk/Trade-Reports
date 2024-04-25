import { calculateTotalOrderInfo } from "./calculateTotalOrderInfo.js";

export const handleChangeInputsEventListeners = (clientObj) => {
    let productInputObjList = clientObj.querySelectorAll("input");
    productInputObjList.forEach(input => {
        function handleChangeInputEventListener(){
            let managerPayValue = +clientObj.querySelector(
                ".top_block input").value;
            
            // зчитуємо дані з інпутів

            let productObjList = clientObj.querySelectorAll(".product");

            let productsList = [];
    
            for(let l = 0; l < productObjList.length; l++){
                let productObj = productObjList[l];

                let name = productObj.querySelector(".product_name").value;
                let sellPrice = +productObj.querySelector(".bill_value").value;
                let buyPrice = +productObj.querySelector(".buy_price_value").value;
                let num = +productObj.querySelector(".num_value").value;
    
                productsList.push({
                    id: 0,
                    name: name,
                    sellPrice: sellPrice,
                    buyPrice: buyPrice,
                    num: num,
                    orderId: 0
                });
            }

            // перерозраховуємо загальні дані по замовленню

            let totalSellPrice = 0;
            let totalBuyPrice = 0;
            let totalIncome = 0;

            [totalSellPrice, totalBuyPrice, totalIncome] = 
                calculateTotalOrderInfo(managerPayValue, productsList);

            // перезаписуємо значення в полях для цих загальних даних
            
            clientObj.querySelector(
                ".total_info_block .sum_bill_value").innerText = totalSellPrice;
            clientObj.querySelector(
                ".total_info_block .sum_price_value").innerText = totalBuyPrice;
            clientObj.querySelector(
                ".total_info_block .income_value").innerText = totalIncome;
        }

        input.removeEventListener("change", handleChangeInputEventListener);
        input.addEventListener("change", handleChangeInputEventListener);
    });
}
