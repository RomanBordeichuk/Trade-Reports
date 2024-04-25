import { calculateDayStatsInfo } from "./calculateDayStatsInfo.js";
import { handleEditDollarCourseEventListeners } from "./handleEditDollarCourseEventListeners.js";

export const createDayStats = (i, j, dayEntity, dayInnerBlockObj) => {
    let orderList = dayEntity.orderList;
    let dollarCourse = dayEntity.dollarCourse;

    let dollarCourseBlockObj = document.createElement("div");
    dollarCourseBlockObj.classList.add("dollar_course");
    dollarCourseBlockObj.innerHTML = `
        <div>
            <span class="course">Ціна купівлі долара (грн.):</span>
            <input type="number" class="course_value value" value="` + dollarCourse + `"
                disabled="true">
        </div>
        <button>
            <img src="img/edit.png" alt="" class="edit">
            <img src="img/check.png" alt="" class="check" style="display: none;">
        </button>`;
        
    dayInnerBlockObj.append(dollarCourseBlockObj);
    
    let statisticsObj = document.createElement("div");
    statisticsObj.classList.add("statistics");
    statisticsObj.innerHTML = `
        <h3>Статистика за день</h3>
        <div class="stats_list">
            <div>
                <div>
                    <span class="num_clients">Кількість клієнтів:</span>
                    <span class="num_clients_value">` + 0 + `</span>
                </div>
                <div>
                    <span class="num_products">
                        Кількість проданих товарів:
                    </span>
                    <span class="num_products_value">` + 0 + `</span>
                </div>
                <div>
                    <span class="av_client_income">
                        Середній дохід з клієнта (USD):
                    </span>
                    <span class="av_client_income_value">` + 0 + `</span>
                </div>
            </div>
            <div>
                <div>
                    <span class="av_product_income">
                        Середній дохід з одного товару (USD):
                    </span>
                    <span class="av_product_income_value">` + 0 + `</span>
                </div>
                <div>
                    <span class="sum_income">Сумарний дохід (USD):</span>
                    <span class="sum_income_value">` + 0 + `</span>
                </div>
                <div>
                    <span class="sum_bill">Сумарний чек (USD):</span>
                    <span class="sum_bill_value">` + 0 + `</span>
                </div>
            </div>
        </div>`;

    calculateDayStatsInfo(statisticsObj, orderList, dollarCourse);

    dayInnerBlockObj.append(statisticsObj);

    handleEditDollarCourseEventListeners(i, j, dayInnerBlockObj, dayEntity.date);
} 
