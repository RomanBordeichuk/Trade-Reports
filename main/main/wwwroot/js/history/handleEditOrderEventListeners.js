import { editOrderStatesList } from "./createMonthList.js";
import { updateOrder } from "../requests/updateOrder.js";
import { loadProductsList } from "./loadProductsList.js";
import { calculateDayStatsInfo } from "./calculateDayStatsInfo.js";
import { handleChangeInputsEventListeners } from "./handleChangeInputEventListeners.js";
import { handleDeleteOrderProductEventListeners } from "./handleDeleteOrderProductEventListeners.js";

export const handleEditOrderEventListeners = async (i, j, k, titleBlockObj, 
    clientObj, addProductButtonObj, productsListObj, dayInnerBlockObj, 
    dayEntity, productsList, id) => {
    let productObjList = clientObj.querySelectorAll(".product");
    let editOrderButton = titleBlockObj.querySelector("button");

    // реалізуємо алгоритм внесення змін 
    // при натисканні на значок редагування біля замовлення

    editOrderButton.addEventListener("click", async () => {
        let productInputList = clientObj.querySelectorAll("input, textarea");
        let productBacketList = clientObj.querySelectorAll(".product .edit_block");
        let addProductButton = clientObj.querySelector(".add_product");
        let productObjList = clientObj.querySelectorAll(".product");

        // активуємо інпути, корзини і кнопку "додати товар" 
        // якщо режим редагування не був активований
        
        if(editOrderStatesList[i][j][k] == 0){
            editOrderButton.querySelector(".edit").style.display = "none";
            editOrderButton.querySelector(".check").style.display = "block";

            productInputList.forEach(input => {
                input.disabled = false;
            });
            productBacketList.forEach(backet => {
                backet.style.display = "block";
            });

            addProductButton.style.display = "flex";
            editOrderStatesList[i][j][k] = 1;
        }

        // виключаємо інпути, корзини, кнопку "додати товар", 
        // а також зберігаємо зміни 
        // при другому кліку по значку редагування (виходимо з режиму редагування)

        else{
            editOrderButton.querySelector(".edit").style.display = "block";
            editOrderButton.querySelector(".check").style.display = "none";

            productInputList.forEach(input => {
                input.disabled = true;
            });
            productBacketList.forEach(backet => {
                backet.style.display = "none";
            });

            addProductButton.style.display = "none";

            // зчитуємо загальні дані по замовленню

            let totalSellPrice = +clientObj.querySelector(
                ".total_info_block .sum_bill_value").innerText;
            let totalBuyPrice = +clientObj.querySelector(
                ".total_info_block .sum_price_value").innerText;
            let totalIncome = +clientObj.querySelector(
                ".total_info_block .income_value").innerText;
            let managerPayValue = +clientObj.querySelector(
                ".top_block input").value;

            // перезаписуємо дані з інпутів (щоб внести зміни після редагування)

            for(let i = 0; i < productObjList.length; i++){
                let productObj = productObjList[i];

                let name = productObj.querySelector(".product_name").value;
                let sellPrice = +productObj.querySelector(".bill_value").value;
                let buyPrice = +productObj.querySelector(".buy_price_value").value;
                let num = +productObj.querySelector(".num_value").value;

                productsList[i].name = name;
                productsList[i].sellPrice = sellPrice;
                productsList[i].buyPrice = buyPrice;
                productsList[i].num = num;
            }

            // закидаємо зміни на сервер і в базу даних
            
            await updateOrder(id, managerPayValue, productsList, 
                totalSellPrice, totalBuyPrice, totalIncome);

            // оновлюємо об'єкт order в orderList

            let statisticsObj = dayInnerBlockObj.querySelector(".statistics");
            let orderList = dayEntity.orderList;
            let dollarCourse = dayEntity.dollarCourse;

            for(let l = 0; l < orderList.length; l++){
                let order = orderList[l];

                if(order.id == id){
                    let newOrder = {
                        id: id,
                        dayId: order.dayId,
                        clientNum: order.clientNum,
                        date: order.date,
                        managerPayValue: managerPayValue,
                        productsList: productsList,
                        totalSellPrice: totalSellPrice,
                        totalBuyPrice: totalBuyPrice,
                        totalIncome: totalIncome
                    }

                    orderList[l] = newOrder;

                    break;
                }
            }

            // перезаписуємо значення в полях статистики за день
    
            calculateDayStatsInfo(statisticsObj, orderList, dollarCourse);

            editOrderStatesList[i][j][k] = 0;
        }
    });

    // зчитуємо зміни і автоматично оновлюєм загальні дані по замовленню і дані по дню в цілому
    // підчас кожної зміни в інпутах

    handleChangeInputsEventListeners(clientObj);

    // видаляємо поле товару при кліку на корзину

    handleDeleteOrderProductEventListeners(clientObj, productsList);

    // створюємо список категорій товарів на вибір при кліку на кнопку "додати товар"

    addProductButtonObj.addEventListener("click", async () => {
        await loadProductsList(clientObj, productsListObj, productsList);
    });
}
