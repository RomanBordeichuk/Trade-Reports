import { categoryObjStatesList } from "./loadDayInfo.js";

export const handleCategoryToggleEventListeners = () => {
    let categoriesObjList = document.querySelectorAll(".categories_list .category");

    for(let i = 0; i < categoriesObjList.length; i++){
        let name = categoriesObjList[i].querySelector(".name");

        // переключення спискій категорії товарів при кліку

        name.addEventListener("click", () => {
            let productsList = categoriesObjList[i].querySelector(".products_list");

            if(categoryObjStatesList[i] == 0){
                productsList.style.display = "block";
                categoryObjStatesList[i] = 1;
            }
            else{
                productsList.style.display = "none";
                categoryObjStatesList[i] = 0;
            }
        });
    }
}
