import { editProductObjStatesList } from "./createCategoriesList.js";
import { updateProduct } from "../requests/updateProduct.js";

export const handleEditProductEventListeners = async (categoriesList) => {
    let categoryObjList = document.querySelectorAll(".categories_list .category");
    for(let i = 0; i < categoryObjList.length; i++){
        let editButtonObjList = categoryObjList[i].querySelectorAll(".product .edit");

        for(let j = 0; j < editButtonObjList.length; j++){
            let productObj = categoryObjList[i].querySelectorAll(".product")[j];

            // функція зміни даних

            async function handleEditProductEventListener(){
                let inputObjList = productObj.querySelectorAll("input, textarea");

                // активуємо інпути по першому кліку

                if(editProductObjStatesList[i][j] == 0){
                    productObj.querySelector(".pencil").style.display = "none";
                    productObj.querySelector(".check").style.display = "inline";
                    editProductObjStatesList[i][j] = 1;

                    inputObjList.forEach(inputObj => {
                        inputObj.disabled = false;
                    });
                }

                // виключаємо інпути, оновлюємо інформацію про товар по другому кліку

                else{
                    productObj.querySelector(".pencil").style.display = "inline";
                    productObj.querySelector(".check").style.display = "none";
                    editProductObjStatesList[i][j] = 0;

                    inputObjList.forEach(async inputObj => {
                        inputObj.disabled = true;
                    });

                    let id = categoriesList[i].products[j].id;
                    let name = productObj.querySelector(".name_input").value;
                    let sellPrice = +productObj.querySelector(".sell_price_input").value;
                    let buyPrice = +productObj.querySelector(".buy_price_input").value;

                    await updateProduct(id, name, sellPrice, buyPrice); 
                }
            }

            // змінюємо дані про товар по кліку на відповідну кнопку

            editButtonObjList[j].removeEventListener("click", await handleEditProductEventListener);
            editButtonObjList[j].addEventListener("click", await handleEditProductEventListener);
        }
    }
}
