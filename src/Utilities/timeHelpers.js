
export function formatTimeString(dateString) {
    let d = new Date(dateString);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return hours + ":" + minutes;
}

export function getDuration(timeStartString, timeEndString) {
    let startDate = new Date(timeStartString);
    let endDate = new Date(timeEndString);
    let duration = endDate - startDate;
    console.log(duration.toString());
    let durationInMs = parseInt(duration.toString());
    let durationInMin = Math.floor(durationInMs / 60000);
    return durationInMin;
}