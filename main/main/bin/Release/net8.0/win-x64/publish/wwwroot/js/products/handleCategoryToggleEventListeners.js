import { categoryObjStatesList } from "./createCategoriesList.js";

export const handleCategoryToggleEventListeners = async () => {
    let categoriesObjList = document.querySelectorAll(".categories_list .category");

    for(let i = 0; i < categoriesObjList.length; i++){
        let nameBack = categoriesObjList[i].querySelector(".name .back");

        // зміна стану категорії товару при кліку

        nameBack.addEventListener("click", () => {
            let categoriInnerBlockObj = 
                categoriesObjList[i].querySelector(".category_inner_block");

            if(categoryObjStatesList[i] == 0){
                categoriInnerBlockObj.style.display = "block";
                categoryObjStatesList[i] = 1;
            }
            else{
                categoriInnerBlockObj.style.display = "none";
                categoryObjStatesList[i] = 0;
            }
        });
    }
}
