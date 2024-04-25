export const getDollarCourse = async () => {
    const request = await fetch("https://api.monobank.ua/bank/currency", {
        method: "GET",
        headers: { 
            "Accept":"application/json", 
            "Content-Type":"application/json" 
        }
    });

    let allCourses = await request.json();

    for(let i = 0; i < allCourses.length; i++){
        if(allCourses[i].currencyCodeA == 840) {
            return allCourses[i].rateBuy;
        }
    }
}