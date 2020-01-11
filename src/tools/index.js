function getDate() {
    const date = new Date()
    const fullYear = date.getFullYear().toString();
    const year = fullYear[2] + fullYear[3];
    const shortDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${year}`;
    let minutes = date.getMinutes();
    let hours = date.getHours();
    if (parseInt(minutes) < 10) {
        minutes = `0${minutes}`
    } if (parseInt(hours) < 10) {
        hours = `0${hours}`
    }
    const time = `${hours}:${minutes}`
    return {
        date: shortDate,
        time: time
    }
}

export { getDate }