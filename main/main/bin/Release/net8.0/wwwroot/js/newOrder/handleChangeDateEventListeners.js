import { loadOrderInfo } from "../requests/loadOrderInfo.js"; 

export const handleChangeDateEventListeners = () => {
    let clientNumObj = document.querySelector(".top_block .client_num_value");
    let managerPaymentInput = document.querySelector(".top_block .manager_payment_input");

    let dateInput = document.querySelector(".date_block .date_input");
    let editButton = document.querySelector(".date_block .edit");
    let saveButton = document.querySelector(".date_block .check");

    // активація інпуту зміни дати по кліку на відповідну кнопку

    editButton.addEventListener("click", (e) => {
        e.preventDefault();

        dateInput.disabled = false;
        editButton.style.display = "none";
        saveButton.style.display = "inline";
    });

    // блокування інпуту по повторному кліку, 
    // перепідтягування базової інформації про вказаний день

    saveButton.addEventListener("click", async (e) => {
        e.preventDefault();

        dateInput.disabled = true;
        editButton.style.display = "inline";
        saveButton.style.display = "none";

        let dateInputList = dateInput.value.split("-");

        let today = [];
        
        today[0] = dateInputList[2];
        today[1] = dateInputList[1];
        today[2] = dateInputList[0];

        let orderInfo = await loadOrderInfo(today);
        clientNumObj.innerText = orderInfo[0];
        managerPaymentInput.value = orderInfo[1];
    });
}
