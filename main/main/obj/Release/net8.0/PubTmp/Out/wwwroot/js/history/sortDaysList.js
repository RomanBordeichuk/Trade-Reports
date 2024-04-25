export const sortDaysList = (daysList) => {
    for(let i = 1; i < daysList.length; i++){
        for(let j = 0; j < daysList.length - i; j++){
            let secondIsBigger = false;
            
            if(daysList[j + 1].date[2] > daysList[j].date[2]){
                secondIsBigger = true;
            }
    
            if(secondIsBigger){
                let temp = daysList[j];
                daysList[j] = daysList[j + 1];
                daysList[j + 1] = temp;
            }
        }
    }
}
