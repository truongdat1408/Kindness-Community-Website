export default function changeToDate(timeJson) {
    var date = timeJson.split('T')[0]
    return date
}