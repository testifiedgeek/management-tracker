var date = new Date();
var month =
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
var current_date = date.getFullYear() + "-" + month + "-" + day;
export default current_date;
