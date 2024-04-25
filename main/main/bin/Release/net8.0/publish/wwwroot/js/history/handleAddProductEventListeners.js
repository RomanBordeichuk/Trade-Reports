import { calculateTotalOrderInfo } from "./calculateTotalOrderInfo.js";
import { handleChangeInputsEventListeners } from "./handleChangeInputEventListeners.js";
import { handleDeleteOrderProductEventListeners } from "./handleDeleteOrderProductEventListeners.js";

export const handleAddProductEventListeners = (clientObj, productsListObj, productsList) => {
    let productObjList = clientObj.querySelectorAll(".categories_list .product");
    productObjList.forEach(productObj => {
        productObj.addEventListener("click", () => {
            let categoriesListObj = clientObj.querySelector(".categories_list");
            let addProductButton = clientObj.querySelector(".add_product");

            let managerPayValue = +clientObj.querySelector(
                ".top_block input").value;

            // зчитуємо дані про вибраний товар

            let numProducts = productsListObj.querySelectorAll(".product").length;

            let name = productObj.querySelector(".product_name").innerText;
            let sellPrice = +productObj.querySelector(".product_sell_price").innerText;
            let buyPrice = +productObj.querySelector(".product_buy_price").innerText;

            // створюємо об'єкт нового товару і додаємо його в список замовлених товарів

            let newProductObj = document.createElement("div");
            newProductObj.classList.add("product");
            newProductObj.innerHTML = `
                <div>
                    <span class="num">` + (numProducts + 1) + `</span>
                </div>
                <div>
                <textarea class="product_name">` + 
                    name + `</textarea>
                </div>
                <div class="bill">
                    <span class="bill">
                        Виставлена ціна (грн.):
                    </span><br>
                    <input type="number" class="bill_value" 
                        value="` + sellPrice + `">
                </div>
                <div>
                    <span class="buy_price">
                        Закупівельна ціна (грн.):
                    </span><br>
                    <input type="number" class="buy_price_value" 
                        value="` + buyPrice + `">
                </div>
                <div>
                    <span class="num">Кількість:</span>
                    <input type="number" class="num_value" 
                        value="` + 1 + `">
                </div>
                <button class="edit_block" style="display: block;">
                    <img src="img/delete.png" alt="" class="delete">
                </button>`;

            productsListObj.append(newProductObj);

            addProductButton.style.display = "flex";
            categoriesListObj.style.display = "none";

            categoriesListObj.innerHTML = "";

            let orderId = productsList[0].orderId;

            let id = 0;

            while(true){
                let flag = true;

                for(let i = 0; i < productsList.length; i++){
                    if(id == productsList[i]){
                        flag = false;
                        break;
                    }
                }

                if(flag){
                    break;
                }
            }

            // добавляємо новий товар

            productsList.push({
                id: id,
                name: name,
                sellPrice: sellPrice,
                buyPrice: buyPrice,
                num: 1,
                orderId: orderId
            });

            // перерозраховуємо і замінюємо загальні дані по замовленню

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
            
            // перевішуємо прослушку на зчитування інпутів

            handleChangeInputsEventListeners(clientObj);

            // перевішуємо прослушку на видалення вибраних товарів при кліку на корзину

            handleDeleteOrderProductEventListeners(clientObj, productsList);
        });
    });
}
