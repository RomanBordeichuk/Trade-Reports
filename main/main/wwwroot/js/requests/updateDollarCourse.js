export const updateDollarCourse = async (dollarBuyPrice, date) => {
    const response = await fetch("/updateDollarCourse", {
        method: "POST",
        headers: { "Accept":"application/json", "Content-Type":"application/json" },
        body: JSON.stringify({
            dollarBuyPrice: dollarBuyPrice,
            dollarCourseDate: date
        })
    });

    const message = await response.json();
}
