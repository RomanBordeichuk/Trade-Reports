import { choosenProductsList } from "./loadDayInfo.js";
import { updateTotalInfo } from "./updateTotalInfo.js";

export const handleDeleteProductEventListeners = () => {    
    let choosenProductsListObj = document.querySelector(
        ".products_list .choosen_products_list");
    let productObjList = choosenProductsListObj.querySelectorAll(".product");

    for(let i = 0; i < productObjList.length; i++){
        // власне фукнція видалення товару при кліку
        let productDeleteButton = productObjList[i].querySelector(".cancel");

        function deleteProduct(){
            productObjList[i].remove();
            choosenProductsList.splice(i, 1);
            
            updateTotalInfo(choosenProductsList);
        }

        // перевішування прослушки на весь список товарів

        productDeleteButton.removeEventListener("click", deleteProduct);
        productDeleteButton.addEventListener("click", deleteProduct);
    }
}
