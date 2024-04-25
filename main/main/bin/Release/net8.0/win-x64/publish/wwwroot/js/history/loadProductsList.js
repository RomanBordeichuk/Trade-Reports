import { loadCategoriesList } from "../requests/loadCategoriesList.js";
import { categoryObjStatesList } from "./createMonthList.js";
import { handleCategoryToggleEventListeners } from "./handleCategoryToggleEventListeners.js";
import { handleAddProductEventListeners } from "./handleAddProductEventListeners.js";

export const loadProductsList = async (clientObj, productsListObj, productsList) => {
    let categoriesListObj = clientObj.querySelector(".categories_list");
    let addProductButton = clientObj.querySelector(".add_product");

    // підтягуємо з сервера список категорій

    let categoriesList = await loadCategoriesList();

    addProductButton.style.display = "none";
    categoriesListObj.style.display = "block";

    // створюємо список категорій
    
    for(let i = 0; i < categoriesList.length; i++){
        let category = categoriesList[i];

        let categoryObj = document.createElement("div");
        categoryObj.classList.add("category");

        let nameObj = document.createElement("button");
        nameObj.classList.add("name");
        nameObj.innerHTML = `
            <div class="name_block">
                <img src="img/down.png" alt="">
                <span>` + category.name + `</span>
            </div>`;

        categoryObj.append(nameObj);

        let productsListObj = document.createElement("div");
        productsListObj.classList.add("products_list");
        productsListObj.style.display = "none";

        category.products.forEach(product => {
            let productObj = document.createElement("button");
            productObj.classList.add("product");
            productObj.innerHTML = `
                <span class="product_name">` + product.name + `</span>
                <div class="bill">
                    <span>Виставлена ціна (грн.):</span>
                    <span class="product_sell_price">` + product.sellPrice + `</span>
                </div>
                <div class="buy_price">
                    <span>Закупівельна ціна (грн.):</span>
                    <span class="product_buy_price">` + product.buyPrice + `</span>
                </div>`;

            productsListObj.append(productObj);
        });

        categoryObj.append(productsListObj);
        categoriesListObj.append(categoryObj);

        categoryObjStatesList.push(0);
    }

    // реалізуємо переключання категорій при кліку

    handleCategoryToggleEventListeners(clientObj);

    // реалізуємо додавання нового товару при кліку

    handleAddProductEventListeners(clientObj, productsListObj, productsList);
}
