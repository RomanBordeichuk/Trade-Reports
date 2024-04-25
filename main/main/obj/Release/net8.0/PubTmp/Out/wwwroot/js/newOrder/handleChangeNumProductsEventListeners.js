import { choosenProductsList } from "./loadDayInfo.js";
import { updateTotalInfo } from "./updateTotalInfo.js";

export const handleChangeNumProductsEventListeners = () => {
    let choosenProductsListObj = document.querySelector(
        ".products_list .choosen_products_list");
    let productObjList = choosenProductsListObj.querySelectorAll(".product");

    for(let i = 0; i < productObjList.length; i++){
        let productNumInput = productObjList[i].querySelector(".num_block .num_value");

        // фукнція переобчислення загальної інформаї по зміні в інпутах
        function changeNum(){
            choosenProductsList[i].num = +productNumInput.value;
            updateTotalInfo(choosenProductsList);
        }
        
        // перевішування прослушки

        productNumInput.removeEventListener("change", changeNum);
        productNumInput.addEventListener("change", changeNum);
    }
}
