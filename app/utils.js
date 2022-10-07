// CONSTANTS
export const secondToMinutes = {
    min25: 1500,
    min5: 300,
    min1: 30
}

export const dateToSeconds = (dateTime) => {
    return Math.round(dateTime / 1000);
}

export const minuteSecondFormat = (elapsedTime) => {
    const minutes = Math.floor(elapsedTime / 60).toString() //.padStart(2, "0")
    const seconds = (elapsedTime % 60).toString() //.padStart(2, '0')
    // console.log(minutes, seconds)
    return `${sadPad(minutes)}:${sadPad(seconds)}`
}

//padStart doesn't work, this is a sad alternative
const sadPad = (character) => {
    if (character.length === 1) {
        return `0${character}`
    }
    return character
}