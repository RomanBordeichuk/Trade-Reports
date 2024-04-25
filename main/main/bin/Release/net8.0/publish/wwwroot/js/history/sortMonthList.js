import { monthList } from "./createMonthList.js"

export const sortMonthList = () => {
    for(let i = 1; i < monthList.length; i++){
        for(let j = 0; j < monthList.length - i; j++){
            let secondIsBigger = false;
            
            if(monthList[j + 1].date[1] > monthList[j].date[1]){
                secondIsBigger = true;
            }
            else if(monthList[j + 1].date[1] == monthList[j].date[1]){
                if(monthList[j + 1].date[0] > monthList[j].date[0]){
                    secondIsBigger = true;
                }
            }
    
            if(secondIsBigger){
                let temp = monthList[j];
                monthList[j] = monthList[j + 1];
                monthList[j + 1] = temp;
            }
        }
    }
}
