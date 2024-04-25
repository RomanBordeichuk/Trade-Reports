import { categoryObjStatesList } from "./createCategoriesList.js";
import { addCategory } from "../requests/addCategory.js";
import { addProduct } from "../requests/addProduct.js";

export const handleAddCategoryEventListeners = () => {
    let categoriesListObj = document.querySelector(".categories_list");

    let addCategoryButton = document.querySelector(".add_category");
    let categoryForm = document.querySelector(".category_form");
    let categoryNameInput = categoryForm.querySelector("input");
    let saveCategoryFormButton = categoryForm.querySelector(".edit_block");

    // показуємо форму створення нової категорії, 
    // ховаємо кноку "створити нову категорію" при кліку

    addCategoryButton.addEventListener("click", async (e) => {
        e.preventDefault();

        addCategoryButton.style.display = "none";
        categoryForm.style.display = "flex";
    });

    // створюємо категорію при кліку на кнопку "зберегти"

    saveCategoryFormButton.addEventListener("click", async () => {
        categoryForm.style.display = "none";

        let categoryName = categoryNameInput.value;

        if(categoryName == "") categoryName = "категорія без назви";

        // створюємо категорію

        let categoryObj = document.createElement("div");
        categoryObj.classList.add("category");

        let nameObj = document.createElement("div");
        nameObj.classList.add("name");
        nameObj.innerHTML = `
            <div class="name_block">
                <img src="img/down.png" alt="">
                <input type="text" value="` + categoryName + `" disabled="true">
            </div>`;

        categoryObj.append(nameObj);

        let categoryInnerBlockObj = document.createElement("div");
        categoryInnerBlockObj.classList.add("category_inner_block");
        categoryInnerBlockObj.style.display = "none";

        let productsListObj = document.createElement("div");
        productsListObj.classList.add("products_list");
        categoryInnerBlockObj.append(productsListObj);

        // створюємо форму першого товару

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
            <div></div>
            <button class="save">
                <img src="img/check.png" alt="">
            </button>`;

        categoryInnerBlockObj.append(formObj);

        // створюємо кнопку "додати новий товар"

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

        categoryObjStatesList.push(0);

        // додаємо тимчасову прослушку переключення для нової категорії
        
        nameObj.addEventListener("click", (e) => {
            e.preventDefault();

            if(categoryObjStatesList[categoryObjStatesList.length - 1] == 0){
                categoryInnerBlockObj.style.display = "block";
                categoryObjStatesList[categoryObjStatesList.length - 1] = 1;
            }
            else{
                categoryInnerBlockObj.style.display = "none";
                categoryObjStatesList[categoryObjStatesList.length - 1] = 0;
            }
        });

        // додаємо прослушку для кнопки "додати новий товар"

        addBlockButton.addEventListener("click", (e) => {
            e.preventDefault();

            let addProductButton = categoryObj.querySelector(".add_block");
            addProductButton.style.display = "none";
            
            let form = categoryObj.querySelector("form.product");
            form.style.display = "grid";
        });

        // вішаємо прослушку на кнопку "зберегти" для першого товару
            
        let saveButton = categoryObj.querySelector(".save");
        saveButton.addEventListener("click", async (e) =>{
            e.preventDefault();
            
            let form = categoryObj.querySelector("form.product");
            let name = form.querySelector(".product_name").value;
            let buyPrice = +form.querySelector(".buy_price").value;
            let sellPrice = +form.querySelector(".sell_price").value;

            if(name != "" && buyPrice != 0 && sellPrice != 0){
                // зберігаємо нову категорію і товар

                let categoryId = await addCategory(categoryName);
                await addProduct(name, buyPrice, sellPrice, categoryId);

                // перезагружаємо сторінку

                location.reload();
            }
        });
    });
}
