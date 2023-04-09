export default function changeTimeFormat(timeJson) {
    var d = new Date(timeJson);
    var month = d.getMonth() + 1
    var formattedDate = d.getDate() + "-" + month + "-" + d.getFullYear();
    var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    var formattedTime = hours + ":" + minutes;

    formattedDate = formattedDate + " " + formattedTime;
    return formattedDate
}
