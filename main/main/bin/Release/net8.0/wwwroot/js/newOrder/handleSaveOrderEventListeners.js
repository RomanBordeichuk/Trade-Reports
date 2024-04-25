import { choosenProductsList } from "./loadDayInfo.js";
import { getDollarCourse } from "./getDollarCourse.js";
import { setDollarCourse } from "../requests/setDollarCourse.js"
import { saveNewOrder } from "../requests/saveNewOrder.js";
import { loadOrderInfo } from "../requests/loadOrderInfo.js";

export const handleSaveOrderEventListeners = async () => {
    let clientNumObj = document.querySelector(".top_block .client_num_value");
    let managerPaymentInput = document.querySelector(".top_block .manager_payment_input");

    let totalSellPriceObj = document.querySelector(".total_info_block .sell_price");
    let totalBuyPriceObj = document.querySelector(".total_info_block .buy_price");
    let totalIncomeObj = document.querySelector(".total_info_block .income");

    // реалізація зберігання нового замовлення при кліку на відповідну кнопку, 
    // якщо список вибраних товарів не пустий

    let saveOrderButton = document.querySelector(".form .save");
    saveOrderButton.addEventListener("click", async (e) => {
        e.preventDefault();

        if(choosenProductsList.length != 0){
            let date = document.querySelector(".date_block .date_input").value.split("-");

            // підтягування актуального курсу долара

            let dollarBuyPrice = await getDollarCourse();
            await setDollarCourse(dollarBuyPrice);

            // збереження нового замовлення в бд

            await saveNewOrder(date, managerPaymentInput.value, choosenProductsList, 
                totalSellPriceObj.innerText, totalBuyPriceObj.innerText, 
                totalIncomeObj.innerText);

            // заново оновлюємо базову інформацію на поточний день

            let dateRevert = [date[2], date[1], date[0]]; 
            let orderInfo = await loadOrderInfo(dateRevert);
            clientNumObj.innerText = orderInfo[0];
            managerPaymentInput.value = orderInfo[1];

            // показ блоку повідомлення про успішне збереження

            let successfullySavedBlock = document.querySelector(".successfully_saved_block");
            successfullySavedBlock.style.display = "flex";

            // перезагрузка сторінки при кліку на "ок" в повідомленні

            let successfullySavedBlockButton = successfullySavedBlock.querySelector("button");
            successfullySavedBlockButton.addEventListener("click", () => {
                successfullySavedBlock.style.display = "none";
                location.reload();
            });
        }
        else{
            // показ блоку повідомлення про те що не вибрано жодного товару

            let chooseProductsBlock = document.querySelector(".choose_products_block");
            chooseProductsBlock.style.display = "flex";

            // приховування повідомлення при кліку "ок"

            let chooseProductsBlockButton = chooseProductsBlock.querySelector("button");
            chooseProductsBlockButton.addEventListener("click", () => {
                chooseProductsBlock.style.display = "none";
            });
        }
    });
}
