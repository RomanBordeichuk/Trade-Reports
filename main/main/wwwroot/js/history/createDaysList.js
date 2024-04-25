import { daysLoadedList } from "./createMonthList.js";
import { dayToggleStatesList } from "./createMonthList.js";
import { orderToggleStatesList } from "./createMonthList.js";
import { editDollarCourseStatesList } from "./createMonthList.js";
import { editOrderStatesList } from "./createMonthList.js";
import { loadDayInfo } from "../requests/loadDayInfo.js";
import { createDayObj } from "./createDayObj.js";
import { sortDaysList } from "./sortDaysList.js";

export const createDaysList = async (i, monthObj, daysList) => {
    let daysListObj = document.createElement("div");
    daysListObj.classList.add("days_list");

    // сортуємо список днів по спаданню дати

    sortDaysList(daysList);

    // створюємо список днів місяця

    for(let j = 0; j < daysList.length; j++){
        let day = daysList[j];

        // переводимо поле дати в валідний формат

        if(day.date[2] > 9) day.date[2] = "" + day.date[2];
        else day.date[2] = "0" + day.date[2];

        if(day.date[1] > 9) day.date[1] = "" + day.date[1];
        else day.date[1] = "0" + day.date[1];

        day.date[0] = "" + day.date[0];

        let dayObj = document.createElement("div");
        dayObj.classList.add("day");

        let nameObj = document.createElement("div");
        nameObj.classList.add("name");
        nameObj.innerHTML = `
            <img src="img/down.png" alt="">
            <span>` + day.date[2] + "." + day.date[1] + "." + day.date[0] + `</span>`;
            
        dayObj.append(nameObj);

        let dayInnerBlockObj = document.createElement("div");
        dayInnerBlockObj.classList.add("day_inner_block");

        dayObj.append(dayInnerBlockObj);
        daysListObj.append(dayObj);

        // заповнюємо списки з параметрами стану програми

        daysLoadedList[i].push(0);
        dayToggleStatesList[i].push(0);
        editDollarCourseStatesList[i].push(0);
        orderToggleStatesList[i].push([]);
        editOrderStatesList[i].push([]);

        // підгружаємо історію за день при натисканні на поле дня

        nameObj.addEventListener("click", async () => {
            if(daysLoadedList[i][j] == 0){
                let dayEntity = await loadDayInfo(day.id);
                createDayObj(i, j, dayInnerBlockObj, dayEntity);
                daysLoadedList[i][j] = 1;
            }

            // переключаємо стани полів днів

            if(dayToggleStatesList[i][j] == 0){
                dayInnerBlockObj.style.display = "block";
                dayToggleStatesList[i][j] = 1;
            }
            else{
                dayInnerBlockObj.style.display = "none";
                dayToggleStatesList[i][j] = 0;
            }
        });
    }

    monthObj.append(daysListObj);
}
