export const getCurrentDay = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();

    if(month >= 10) month = "" + (month + 1);
    else month = "0" + (month + 1);

    if(day >= 10) day = "" + day;
    else day = "0" + day;

    year += "";

    return [day, month, year];
}