import { choosenProductsList } from "./loadDayInfo.js";
import { updateTotalInfo } from "./updateTotalInfo.js";

export const handleChangeManagerPaymentEventListeners = () => {
    let managerPaymentInput = document.querySelector(".top_block .manager_payment_input");

    // оновлюємо загальну інформації по замовлення по зміні інпуту оплати менеджерам

    managerPaymentInput.addEventListener("change", () => {
        updateTotalInfo(choosenProductsList);
    });
}