import { getCurrentDay } from "./getCurrentDay.js";
import { loadOrderInfo } from "../requests/loadOrderInfo.js";
import { loadProductsList } from "./loadProductsList.js";
import { handleChangeDateEventListeners } from "./handleChangeDateEventListeners.js";
import { handleSaveOrderEventListeners } from "./handleSaveOrderEventListeners.js";
import { handleChangeManagerPaymentEventListeners } from "./handleChangeManagerPaymentEventListeners.js";

export let categoryObjStatesList = []
export let choosenProductsList = []

export const loadDayInfo = async () => {
    let dateInput = document.querySelector(".date_block .date_input");
    let addProductButton = document.querySelector(".form .add_products_button");

    let clientNumObj = document.querySelector(".top_block .client_num_value");
    let managerPaymentInput = document.querySelector(".top_block .manager_payment_input");

    // отримуємо сьогоднійшній день

    let today = getCurrentDay();
    dateInput.value = today[2] + "-" + today[1] + "-" + today[0];

    // підтугяємо з бекенду базову інформацію про замовлення цього дня

    let orderInfo = await loadOrderInfo(today);
    clientNumObj.innerText = orderInfo[0];
    managerPaymentInput.value = orderInfo[1];

    // реалізуємо додавання нового товару

    addProductButton.addEventListener("click", async (e) => {
        e.preventDefault();
        await loadProductsList();
    });

    handleChangeManagerPaymentEventListeners();
    handleChangeDateEventListeners();
    handleSaveOrderEventListeners();
}
