import { createDayStats } from "./createDayStats.js";
import { orderToggleStatesList } from "./createMonthList.js"; 
import { editOrderStatesList } from "./createMonthList.js";
import { handleEditOrderEventListeners } from "./handleEditOrderEventListeners.js";

export const createDayObj = async (i, j, dayInnerBlockObj, dayEntity) => {
    // переводимо поле дати в валідний формат

    if(dayEntity.date[2] > 9) dayEntity.date[2] = "" + dayEntity.date[2];
    else dayEntity.date[2] = "0" + dayEntity.date[2];

    if(dayEntity.date[1] > 9) dayEntity.date[1] = "" + dayEntity.date[1];
    else dayEntity.date[1] = "0" + dayEntity.date[1];

    dayEntity.date[0] = "" + dayEntity.date[0];

    // створюємо блок статистики за день

    createDayStats(i, j, dayEntity, dayInnerBlockObj);

    let clientListObj = document.createElement("div");
    clientListObj.classList.add("client_list");

    // створюємо список замовлень

    let orderList = dayEntity.orderList;
    
    for(let k = 0; k < orderList.length; k++){
        let order = orderList[k];

        let clientObj = document.createElement("div");
        clientObj.classList.add("client");
        
        let titleBlockObj = document.createElement("div");
        titleBlockObj.classList.add("title_block");
        titleBlockObj.innerHTML = `
            <div class="name">
                <div class="circle"></div>
                <span>Клієнт №` + order.clientNum + `</span>
            </div>
            <button>
                <img src="img/edit.png" alt="" class="edit">
                <img src="img/check.png" alt="" class="check" style="display: none;">
            </button>
            <div class="back"></div>`;

        clientObj.append(titleBlockObj);

        let clientInfoObj = document.createElement("div");
        clientInfoObj.classList.add("client_info");
        clientInfoObj.style.display = "none";

        let topBlockObj = document.createElement("div");
        topBlockObj.classList.add("top_block");
        topBlockObj.innerHTML = `
            <div>
                <span class="manager_payment">
                    Оплата менеджерам(грн.):
                </span>
                <input type="number" class="manager_payment_value" 
                    value="` + order.managerPayValue + `" disabled="true">
            </div>`;
        
        clientInfoObj.append(topBlockObj);

        let productsBlockObj = document.createElement("div");
        productsBlockObj.classList.add("products_block");

        let h3Obj = document.createElement("h3");
        h3Obj.innerText = "Список вибраних товарів";
        productsBlockObj.append(h3Obj);

        let productsListObj = document.createElement("div");
        productsListObj.classList.add("products_list");

        // створюємо список проданих товарів
        
        for(let l = 0; l < order.productsList.length; l++){
            let product = order.productsList[l];

            let productObj = document.createElement("div");
            productObj.classList.add("product");
            productObj.innerHTML = `
                <div>
                    <span class="num">` + (l + 1) + `</span>
                </div>
                <div>
                    <textarea class="product_name" disabled="true">` + 
                        product.name + `</textarea>
                </div>
                <div class="bill">
                    <span class="bill">
                        Виставлена ціна (грн.):
                    </span><br>
                    <input type="number" class="bill_value" 
                        value="` + product.sellPrice + `" disabled="true">
                </div>
                <div>
                    <span class="buy_price">
                        Закупівельна ціна (грн.):
                    </span><br>
                    <input type="number" class="buy_price_value" 
                        value="` + product.buyPrice + `" disabled="true">
                </div>
                <div>
                    <span class="num">Кількість:</span>
                    <input type="number" class="num_value" 
                        value="` + product.num + `" disabled="true">
                </div>
                <button class="edit_block" style="display: none;">
                    <img src="img/delete.png" alt="" class="delete">
                </button>`;

            productsListObj.append(productObj);
        }
        
        productsBlockObj.append(productsListObj);

        let addProductButtonObj = document.createElement("button");
        addProductButtonObj.classList.add("add_product");
        addProductButtonObj.style.display = "none";
        addProductButtonObj.innerHTML = `
            <div class="plus">
                <div class="line1 line"></div>
                <div class="line2 line"></div>
            </div>
            <span>Додати товар</span>`;
        
        productsBlockObj.append(addProductButtonObj);

        let categoriesListObj = document.createElement("div");
        categoriesListObj.classList.add("categories_list");
        categoriesListObj.style.display = "none";

        productsBlockObj.append(categoriesListObj);
        clientInfoObj.append(productsBlockObj);

        // округляємо загальні дані по замовлення

        order.totalBuyPrice = Math.round(order.totalBuyPrice * 100) / 100;
        order.totalSellPrice = Math.round(order.totalSellPrice * 100) / 100;
        order.totalIncome = Math.round(order.totalIncome * 100) / 100;

        let totalInfoBlockObj = document.createElement("div");
        totalInfoBlockObj.classList.add("total_info_block");
        totalInfoBlockObj.innerHTML = `
            <div class="total_info_block">
                <div>
                    <span class="sum_price">
                        Загальна закупівельна вартість (грн.):
                    </span>
                    <span class="sum_price_value">
                        ` + order.totalBuyPrice + `
                    </span>
                </div>
                <div>
                    <span class="sum_bill">
                        Сумарний чек (грн):
                    </span>
                    <span class="sum_bill_value">
                        ` + order.totalSellPrice + `
                    </span>
                </div>
                <div>
                    <span class="income">Дохід (грн.):</span>
                    <span class="income_value">
                        ` + order.totalIncome + `
                    </span>
                </div>
            </div>`;

        clientInfoObj.append(totalInfoBlockObj);
        clientObj.append(clientInfoObj);
        clientListObj.append(clientObj);

        orderToggleStatesList[i][j].push(0);
        editOrderStatesList[i][j].push(0);

        // переключаємо стан замовлень при кліку

        let titleBlockBackObj = titleBlockObj.querySelector(".back");
        titleBlockBackObj.addEventListener("click", () => {
            if(orderToggleStatesList[i][j][k] == 0){
                clientInfoObj.style.display = "grid";
                orderToggleStatesList[i][j][k] = 1;
            }
            else{
                clientInfoObj.style.display = "none";
                orderToggleStatesList[i][j][k] = 0;
            }
        });

        let id = order.id;

        // створюємо список проданих товарів

        let productsList = [];
        
        let productObjList = clientObj.querySelectorAll(".product");

        for(let l = 0; l < productObjList.length; l++){
            let productObj = productObjList[l];

            let id = order.productsList[l].id;
            let orderId = order.productsList[l].orderId;
            let name = productObj.querySelector(".product_name").value;
            let sellPrice = +productObj.querySelector(".bill_value").value;
            let buyPrice = +productObj.querySelector(".buy_price_value").value;
            let num = +productObj.querySelector(".num_value").value;

            productsList.push({
                id: id,
                name: name,
                sellPrice: sellPrice,
                buyPrice: buyPrice,
                num: num,
                orderId: orderId
            });
        }

        // реалізуємо зміну інформації про замовлення в історії товарів

        await handleEditOrderEventListeners(i, j, k, titleBlockObj, clientObj, 
            addProductButtonObj, productsListObj, 
            dayInnerBlockObj, dayEntity, productsList, id);
    }

    dayInnerBlockObj.append(clientListObj);
}
