import { loadMonthList } from "../requests/loadMonthList.js";
import { sortMonthList } from "./sortMonthList.js";
import { loadDaysList } from "../requests/loadDaysList.js";
import { createDaysList } from "./createDaysList.js"; 

export let monthsLoadedList = []
export let monthToggleStatesList = []
export let monthList = []
export let daysLoadedList = []
export let dayToggleStatesList = []
export let editDollarCourseStatesList = [];
export let orderToggleStatesList = []
export let editOrderStatesList = []
export let categoryObjStatesList = []

export const createMonthList = async () => {
    let monthListObj = document.querySelector(".history .month_list");
    monthListObj.innerHTML = "";

    // підтягуємо з сервера список місяців

    monthList = await loadMonthList();

    // сортуємо список місяців по спаданню дати

    sortMonthList();

    // переводимо поле дати в валідний вигляд

    monthList.forEach(month => {
        if(month.month[0] > 9) month.month[0] = "" + month.month[0];
        else month.month[0] = "0" + month.month[0];

        month.month[1] = "" + month.month[1];
    });

    // створюємо список місяців

    for(let i = 0; i < monthList.length; i++){
        let monthObj = document.createElement("div");
        monthObj.classList.add("month");

        let nameObj = document.createElement("div");
        nameObj.classList.add("name");
        nameObj.innerHTML = `
            <img src="img/down.png" alt="">
            <h3>` + monthList[i].month[0] + "." + monthList[i].month[1] + `</h3>`;
        
        monthObj.append(nameObj);
        monthListObj.append(monthObj);

        // заповнюємо початковими даними списки з параметрами стану програми

        monthsLoadedList.push(0);
        monthToggleStatesList.push(0);
        daysLoadedList.push([]);
        dayToggleStatesList.push([]);
        editDollarCourseStatesList.push([]);
        orderToggleStatesList.push([]);
        editOrderStatesList.push([]);

        // підгружаємо список днів при натисканні на поле місяця

        nameObj.addEventListener("click", async () => {
            if(monthsLoadedList[i] == 0) {
                let daysList = await loadDaysList(monthList[i].id);
                createDaysList(i, monthObj, daysList);
                monthsLoadedList[i] = 1;
            }

            // переключаємо стани полів місяців

            let daysListObj = monthObj.querySelector(".days_list");

            if(monthToggleStatesList[i] == 0){
                daysListObj.style.display = "block";
                monthToggleStatesList[i] = 1;
            }
            else{
                daysListObj.style.display = "none";
                monthToggleStatesList[i] = 0;
            }
        });
    }
}
