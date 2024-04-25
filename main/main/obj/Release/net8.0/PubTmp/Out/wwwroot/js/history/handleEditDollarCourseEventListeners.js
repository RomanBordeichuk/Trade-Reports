import { editDollarCourseStatesList } from "./createMonthList.js";
import { updateDollarCourse } from "../requests/updateDollarCourse.js";

export const handleEditDollarCourseEventListeners = (i, j, dayInnerBlockObj, date) => {
    let dollarCourseButton = dayInnerBlockObj.querySelector(".dollar_course button");
    let dollarCourseInput = dayInnerBlockObj.querySelector(".dollar_course input");
    let editButtonImg = dayInnerBlockObj.querySelector(".dollar_course button .edit");
    let saveButtonImg = dayInnerBlockObj.querySelector(".dollar_course button .check");

    dollarCourseButton.addEventListener("click", async () => {
        if(editDollarCourseStatesList[i][j] == 0){
            editButtonImg.style.display = "none";
            saveButtonImg.style.display = "block";
            dollarCourseInput.disabled = false;

            editDollarCourseStatesList[i][j] = 1;
        }
        else{
            editButtonImg.style.display = "block";
            saveButtonImg.style.display = "none";
            dollarCourseInput.disabled = true;

            let value = +dollarCourseInput.value;

            await updateDollarCourse(value, date);

            editDollarCourseStatesList[i][j] = 0;
        }
    });
}
