import { categoryChangeStatesList } from "./createCategoriesList.js";
import { updateCategory } from "../requests/updateCategory.js";

export const handleEditCategoryEventListeners = async (categoriesList) => {
    let categoryObjList = document.querySelectorAll(".categories_list .category");

    for(let i = 0; i < categoryObjList.length; i++){
        let categoryNameInput = categoryObjList[i].querySelector(".name_block input");
        let categoryNameSpan = categoryObjList[i].querySelector(".name_block span");
        let editButtonObj = categoryObjList[i].querySelector(".edit_block");

        // функція зміни назви категорії

        async function handleEditCategoryEventListener(){
            // активуємо інпут зміни назви категорії по кліку

            if(categoryChangeStatesList[i] == 0){
                editButtonObj.querySelector(".edit").style.display = "none";
                editButtonObj.querySelector(".check").style.display = "inline";
                categoryNameInput.style.display = "inline";
                categoryNameSpan.style.display = "none";
                categoryNameInput.disabled = false;
                categoryChangeStatesList[i] = 1;
            }

            // оновлюємо назву категорії в бд по повторному кліку

            else{
                editButtonObj.querySelector(".edit").style.display = "inline";
                editButtonObj.querySelector(".check").style.display = "none";
                categoryNameInput.style.display = "none";
                categoryNameSpan.style.display = "inline";
                categoryNameInput.disabled = true;
                categoryChangeStatesList[i] = 0;

                let name = categoryNameInput.value;
                categoryNameSpan.innerText = name;

                if(name == "") name = "категорія без назви";

                await updateCategory(categoriesList[i].id, name);
            }
        }

        // перевішуємо прослушку на зміну назв категорій

        editButtonObj.removeEventListener("click", await handleEditCategoryEventListener);
        editButtonObj.addEventListener("click", await handleEditCategoryEventListener);
    }
}
