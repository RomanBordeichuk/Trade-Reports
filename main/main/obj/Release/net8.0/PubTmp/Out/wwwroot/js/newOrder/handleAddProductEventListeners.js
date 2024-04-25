import { choosenProductsList } from "./loadDayInfo.js";
import { updateTotalInfo } from "./updateTotalInfo.js";
import { handleDeleteProductEventListeners } from "./handleDeleteProductEventListeners.js";
import { handleChangeNumProductsEventListeners } from "./handleChangeNumProductsEventListeners.js";

export const handleAddProductEventListeners = () => {
    let choosenProductsListObj = document.querySelector(
        ".products_list .choosen_products_list");
    let categoriesListObj = document.querySelector(".categories_list");
    let addProductButton = document.querySelector(".form .add_products_button");

    // додавання нового товару в список вибраних товарів при кліку

    let productObjList = document.querySelectorAll(".categories_list .product");
    productObjList.forEach(productObj => {
        productObj.addEventListener("click", () => {
            let name = productObj.querySelector(".product_name").innerText;
            let sellPrice = +productObj.querySelector(".product_sell_price").innerText;
            let buyPrice = +productObj.querySelector(".product_buy_price").innerText;
            
            choosenProductsList.push({
                id: 0,
                name: name,
                sellPrice: sellPrice,
                buyPrice: buyPrice,
                num: 1,
                orderId: 0
            });

            choosenProductsListObj.innerHTML = "";

            choosenProductsList.forEach(product => {
                choosenProductsListObj.innerHTML += `
                <div class="product">
                    <span class="name">` + product.name + `</span>
                    <div class="bill_block">
                        <span class="bill">Виставлена ціна (грн.):</span><br>
                        <span class="bill_value">` + product.sellPrice + `</span>
                    </div>
                    <div class="price_block">
                        <span class="price">Закупівельна ціна (грн.):</span><br>
                        <span class="price_value">` + product.buyPrice + `</span>
                    </div>
                    <div class="num_block">
                        <span class="num">Кількість: </span>
                        <input type="number" class="num_value" value="` + product.num + `">
                    </div>
                    <button class="cancel">
                        <img src="img/close.png" alt="">
                    </button>
                </div>`;
            });

            // приховування списку доступних категорій товарів,
            // відкривання кнопки додавання нового товару

            categoriesListObj.innerHTML = "";
            addProductButton.style.display = "flex";

            // оновлення загальної інформації про замовлення

            updateTotalInfo(choosenProductsList);

            // перевішуємо прослушку видалення товарів і зміни їх кількості

            handleDeleteProductEventListeners();
            handleChangeNumProductsEventListeners();
        });
    });
}
