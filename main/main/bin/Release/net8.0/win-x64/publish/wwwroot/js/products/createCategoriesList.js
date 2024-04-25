import { loadCategoriesList } from "../requests/loadCategoriesList.js";
import { handleCategoryToggleEventListeners } from "./handleCategoryToggleEventListeners.js";
import { handleAddProductEventListeners } from "./handleAddProductEventListeners.js";
import { handleDeleteProductEventListeners } from "./handleDeleteProductEventListeners.js";
import { handleEditProductEventListeners } from "./handleEditProductEventListeners.js";
import { handleEditCategoryEventListeners } from "./handleEditCategoryEventListeners.js";
import { handleAddCategoryEventListeners } from "./handleAddCategoryEventListeners.js";

export let categoryObjStatesList = []
export let editProductObjStatesList = []
export let categoryChangeStatesList = []

export const createCategoriesList = async () => {
    let categoriesListObj = document.querySelector(".categories_list");
    categoriesListObj.innerHTML = "";

    // підтугуємо з бекенду список категорії товарів

    let categoriesList = await loadCategoriesList();

    // створюємо список категорії товарів

    for(let i = 0; i < categoriesList.length; i++){
        let category = categoriesList[i];

        let categoryObj = document.createElement("div");
        categoryObj.classList.add("category");

        let nameObj = document.createElement("div");
        nameObj.classList.add("name");
        nameObj.innerHTML = `
            <div class="name_block">
                <img src="img/down.png" alt="">
                <span>`+ category.name +`</span>
                <input type="text" value="` + category.name + `" 
                    disabled="true" style="display: none;">
            </div>
            <button class="edit_block">
                <img src="img/edit.png" alt="" class="edit" style="display: inline">
                <img src="img/check.png" alt="" class="check" style="display: none">
            </button>
            <div class="back">`;

        categoryObj.append(nameObj);

        let categoryInnerBlockObj = document.createElement("div");
        categoryInnerBlockObj.classList.add("category_inner_block");
        categoryInnerBlockObj.style.display = "none";

        // створюємо список продуктів в кожній категорії

        let productsListObj = document.createElement("div");
        productsListObj.classList.add("products_list");

        let productObjStatesList = [];

        category.products.forEach(product => {
            let productObj = document.createElement("div");
            productObj.classList.add("product");
            productObj.innerHTML = `
                <textarea class="name_input" disabled="true">` + 
                    product.name + `</textarea>
                <div class="bill">
                    <span>Виставлена ціна (грн.):</span>
                    <input class="sell_price_input" type="number" 
                        value="` + product.sellPrice + `" disabled="true">
                </div>
                <div class="buy_price">
                    <span>Закупівельна ціна (грн.):</span>
                    <input class="buy_price_input" type="number" 
                        value="` + product.buyPrice + `" disabled="true">
                </div>
                <div>
                    <button class="edit">
                        <img src="img/pencil.png" alt="" class="pencil" style="display: inline;">
                        <img src="img/check.png" alt="" class="check" style="display: none;">
                    </button>
                </div>
                <div>
                    <button class="delete">
                        <img src="img/close.png" alt="">
                    </button>
                </div>`;

            productsListObj.append(productObj);
            categoryInnerBlockObj.append(productsListObj);

            // заповнюємо змінні станів програми

            productObjStatesList.push(0);
        });

        // створюємо і приховуємо форму додавання нового товару
        
        let formObj = document.createElement("form");
        formObj.classList.add("product");
        formObj.style.display = "none";
        formObj.innerHTML = `
            <input type="text" placeholder="Назва товару" class="product_name" required>
            <div>
                <label for="">Виставлена ціна (грн.):</label>
                <input type="number" class="sell_price" required>
            </div>
            <div>
                <label for="">Закупівельна ціна (грн.):</label>
                <input type="number" class="buy_price" required>
            </div>
            <div>
                <button class="save">
                    <img src="img/check.png" alt="">
                </button>
            </div>
            <div>
                <button class="cancel">
                    <img src="img/close.png" alt="">
                </button>
            </div>`;

        categoryInnerBlockObj.append(formObj);
        
        // створюємо кнопку додавання нового товару

        let addBlockButton = document.createElement("button");
        addBlockButton.classList.add("add_block");
        addBlockButton.innerHTML = `
            <div class="plus">
                <div class="line1 line"></div>
                <div class="line2 line"></div>
            </div>
            <span>Додати товар</span>`;
        
        categoryInnerBlockObj.append(addBlockButton);
        categoryObj.append(categoryInnerBlockObj);
        categoriesListObj.append(categoryObj);

        // заповнюємо зміні станів програми

        categoryObjStatesList.push(0);
        editProductObjStatesList.push(productObjStatesList);
        categoryChangeStatesList.push(0);
    }

    sessionStorage.setItem("categoryObjStatesList", categoryObjStatesList);
    sessionStorage.setItem("editProductObjStatesList", editProductObjStatesList);
    sessionStorage.setItem("categoryChangeStatesList", categoryChangeStatesList);

    // створюємо і приховуємо форму створення нової категорії товарів

    let createCategoryForm = document.createElement("div");
    createCategoryForm.classList.add("category_form");
    createCategoryForm.style.display = "none";  
    createCategoryForm.innerHTML = `
        <div class="name_block">
            <img src="img/down.png" alt="">
            <input type="text" placeholder="Назва категорії">
        </div>
        <button class="edit_block">
            <img src="img/check.png" alt="" class="check">
        </button>`;
    
    categoriesListObj.append(createCategoryForm);

    // створюємо кнопку збережнення нової категорії

    let addCategoryButton = document.createElement("button");
    addCategoryButton.classList.add("add_category");
    addCategoryButton.innerHTML = `
        <div class="plus">
            <div class="line1 line"></div>
            <div class="line2 line"></div>
        </div>
        <span>Створити нову категорію</span>`;
    
    categoriesListObj.append(addCategoryButton);

    handleCategoryToggleEventListeners();
    await handleAddProductEventListeners(categoriesList);
    await handleDeleteProductEventListeners(categoriesList);
    await handleEditProductEventListeners(categoriesList);
    await handleEditCategoryEventListeners(categoriesList);
    handleAddCategoryEventListeners();
}
