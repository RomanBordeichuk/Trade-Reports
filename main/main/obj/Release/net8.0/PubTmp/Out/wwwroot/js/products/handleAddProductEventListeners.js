import { addProduct } from "../requests/addProduct.js";
import { loadCategoriesList } from "../requests/loadCategoriesList.js";
import { handleDeleteProductEventListeners } from "./handleDeleteProductEventListeners.js";
import { handleEditProductEventListeners } from "./handleEditProductEventListeners.js";

export const handleAddProductEventListeners = async (categoriesList) => {
    let categoriesObjList = document.querySelectorAll(".categories_list .category");
    for(let i = 0; i < categoriesObjList.length; i++){
        let form = categoriesObjList[i].querySelector("form.product");

        // відкриваємо форму добавлення нового товару при кліку на відповідну кнопку
        
        let addBlockButton = categoriesObjList[i].querySelector(".add_block");
        addBlockButton.addEventListener("click", (e) => {
            e.preventDefault();

            addBlockButton.style.display = "none";
            form.style.display = "grid";
        });


        // зберігаємо новий товар при кліку на відповідну кнопку
            
        let saveButton = categoriesObjList[i].querySelector("form.product .save");
        saveButton.addEventListener("click", async (e) =>{
            e.preventDefault();

            let name = form.querySelector(".product_name").value;
            let sellPrice = +form.querySelector(".sell_price").value;
            let buyPrice = +form.querySelector(".buy_price").value;

            // перевіряємо чи не залишено пусті інпути

            if(name != "" && buyPrice != 0 && sellPrice != 0){
                // зберігаємо новий товар в бд

                await addProduct(name, buyPrice, sellPrice, categoriesList[i].id);

                // перепідтягуємо список товарів

                categoriesList = await loadCategoriesList();

                // ховаємо форму, показуємо кнопку "додати новий товар"

                form.style.display = "none";
                addBlockButton.style.display = "flex";

                // чистимо інпути з форми
    
                form.querySelector(".product_name").value = "";
                form.querySelector(".sell_price").value = "";
                form.querySelector(".buy_price").value = "";
    
                let categoryObjList = document.querySelectorAll(".categories_list .category");
                let productsListObj = categoryObjList[i].querySelector(".products_list");

                // створюємо новий товар
    
                let productObj = document.createElement("div");
                productObj.classList.add("product");
                productObj.innerHTML = `
                    <textarea class="name_input" disabled="true">` + 
                        name + `</textarea>
                    <div class="bill">
                        <span>Виставлена ціна (грн.):</span>
                        <input class="sell_price_input" type="number" 
                            value="` + sellPrice + `" disabled="true">
                    </div>
                    <div class="buy_price">
                        <span>Закупівельна ціна (грн.):</span>
                        <input class="buy_price_input" type="number" 
                            value="` + buyPrice + `" disabled="true">
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

                // перевішуємо прослушку видалення і редагування товарів

                await handleDeleteProductEventListeners(categoriesList);
                await handleEditProductEventListeners(categoriesList);
            }
        });

        // ховаємо форму створення нового товару при кліку на відповідну кнопку

        let cancelButton = categoriesObjList[i].querySelector("form.product .cancel");
        cancelButton.addEventListener("click", (e) => {
            e.preventDefault();

            addBlockButton.style.display = "flex";
            form.style.display = "none";
        });
    }
}
