import { deleteProduct } from "../requests/deleteProduct.js";

export const handleDeleteProductEventListeners = async (categoriesList) => {
    let categoryObjList = document.querySelectorAll(".categories_list .category");
    for(let i = 0; i < categoryObjList.length; i++){
        let deleteButtonObjList = categoryObjList[i].querySelectorAll(".product .delete");
        let productObjList = categoryObjList[i].querySelectorAll(".products_list .product");

        for(let j = 0; j < deleteButtonObjList.length; j++){
            // функція видалення товару з бд

            async function handleDeleteProductEventListener(){
                await deleteProduct(categoriesList[i].products[j].id);

                productObjList[j].remove();
                productObjList = categoryObjList[i].querySelectorAll(".products_list .product");

                // видаляємо категорію, якщо було видалено її останній товар

                if(productObjList.length == 0){
                    categoryObjList[i].remove();
                }
            }

            // видаляємо товар з бд при кліку на відповідну кнопку

            deleteButtonObjList[j].removeEventListener("click", handleDeleteProductEventListener);
            deleteButtonObjList[j].addEventListener("click", handleDeleteProductEventListener);
        }
    }
}
