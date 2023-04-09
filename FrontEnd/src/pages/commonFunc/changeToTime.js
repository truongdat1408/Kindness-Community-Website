export default function changeToTime(timeJson) {
    var d = new Date(timeJson)
    var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    var second = d.getSeconds()
    var formattedTime = hours + ":" + minutes + ":" + second
    return formattedTime
}