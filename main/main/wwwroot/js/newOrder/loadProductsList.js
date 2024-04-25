import { loadCategoriesList } from "../requests/loadCategoriesList.js";
import { categoryObjStatesList } from "./loadDayInfo.js";
import { handleCategoryToggleEventListeners } from "./handleCategoryToggleEventListeners.js";
import { handleAddProductEventListeners } from "./handleAddProductEventListeners.js";
import { handleDeleteProductEventListeners } from "./handleDeleteProductEventListeners.js";
import { handleChangeNumProductsEventListeners } from "./handleChangeNumProductsEventListeners.js";

export const loadProductsList = async () => {
    let categoriesListObj = document.querySelector(".form .categories_list");
    let addProductButton = document.querySelector(".form .add_products_button");

    // підгружаємо список категорії товарів

    let categoriesList = await loadCategoriesList();

    // приховуємо кнопку "додати новий товар", поки не буде вибрано поточний

    addProductButton.style.display = "none";

    // створення списку категорій
    
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

        // створення списку товарів в кожній категорії

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

        // заповнюємо списки станій програми

        categoryObjStatesList.push(0);
    }

    handleCategoryToggleEventListeners();
    handleAddProductEventListeners();
    handleDeleteProductEventListeners();
    handleChangeNumProductsEventListeners();
}
