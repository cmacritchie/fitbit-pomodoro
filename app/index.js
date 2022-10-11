import clock from "clock";
import * as document from "document";
import { Pomodoro, stateEnum } from "./pomodoro.js";
import { dateToSeconds, minuteSecondFormat, secondToMinutes, zeroPad } from './utils'
import { display } from "display";
import { vibration } from "haptics";

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let monthsShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//tick every second
clock.granularity = "seconds";


let timeArc = document.getElementById("timeArc");
let playButton = document.getElementById("play-button");
let timerLabel = document.getElementById("timer-label")
let clockBackground = document.getElementById("clockBackground");
let watchTime = document.getElementById("watchTime");

//instantiate pomodoro
let pomodoro = new Pomodoro()
let intervalID;
let stopVibrate;


function secondsToAngle(seconds, reqTime) {
    return (360 / reqTime) * seconds;
  }

function handleClock(evt) {
    let today = evt.date
    let dayName = days[today.getDay()];
    let monthNameShort = monthsShort[today.getMonth()];
    let dayNumber = zeroPad(today.getDate());
    let hours = today.getHours();
    let mins = zeroPad(today.getMinutes());
    let timeString = `${hours}:${mins}`;
    let dateString = `${dayName} ${monthNameShort} ${dayNumber}`; //use later
    watchTime.text = timeString

    pomodoro.updateTime(dateToSeconds(evt.date))
    // console.log(pomodoro.state)
    if(pomodoro.state === stateEnum.idle) {
        clockBackground.style.fill = "#00bfff";
        timerLabel.text = minuteSecondFormat(secondToMinutes.min25)
        timeArc.sweepAngle=0
    }

    if(pomodoro.state === stateEnum.running) {
        // console.log(Object.keys(evt.date))
        // pomodoro.updateTime(dateToSeconds(evt.date))
        // console.log(pomodoro.elapsedTime())
        // const time = pomodoro.elapsedTime()
        // const toad = minuteSecondFormat(time)
        // console.log(toad)
        // const passedTime = 
        timerLabel.text = minuteSecondFormat(secondToMinutes.min25 - pomodoro.elapsedTime())
        timeArc.sweepAngle = secondsToAngle(pomodoro.elapsedTime(), secondToMinutes.min25)
    }

    if(pomodoro.state === stateEnum.endPomo) {
        timerLabel.text = minuteSecondFormat(secondToMinutes.min5)
        timeArc.sweepAngle = 360
        if(Math.floor(pomodoro.elapsedTime()) % 3 === 1) {
            clockBackground.style.fill = "#ff0000"; // Replace "#ffffff" with your color
        }
        else if (Math.floor(pomodoro.elapsedTime()) % 3 === 2){
            clockBackground.style.fill = "#ffffff";
        }
        else {
            clockBackground.style.fill = "#66bb55";
        }
    }

    if(pomodoro.state === stateEnum.breakrunning) {
        clockBackground.style.fill = "#66bb55";
        timeArc.sweepAngle = secondsToAngle(pomodoro.elapsedTime(), secondToMinutes.min5)
        timerLabel.text = minuteSecondFormat(secondToMinutes.min5 - pomodoro.elapsedTime())
    }

    if(pomodoro.state === stateEnum.endBreak) {
        timerLabel.text = minuteSecondFormat(0)
        timeArc.sweepAngle = 360
        clockBackground.style.fill = "#ffa500";
    }
}

function updateDisplay() {
    display.on = true
    vibration.start("alert")

    // setTimeout(vibration.stop(), 5000)
    // vibration.stop()
}

function stopVibratefn() {
    // console.log("stopP IT!")
    vibration.stop("alert")
}


function pomodoroBtn(evt) {
// console.log(clock.getDate())
    const time = dateToSeconds(Date.now())
    // console.log("TMEI", clock.dateToSeconds())
    // pomodoro.setStart(time)
    // console.log("CLICKED", pomodoro.state)
    switch(pomodoro.state) {
        case stateEnum.idle:
            pomodoro.setStart(time, stateEnum.running)
            intervalID = setTimeout(updateDisplay, secondToMinutes.min25 * 1000) //craig
            stopVibrate = setTimeout(stopVibratefn, (secondToMinutes.min25 * 1000) + 10000) //craig
            break;
        case stateEnum.running:
            clearTimeout(intervalID);
            clearTimeout(stopVibrate)
            timerLabel.text = minuteSecondFormat(secondToMinutes.min25)
            timeArc.sweepAngle=0
            pomodoro.state = stateEnum.idle
    
            break;
        case stateEnum.endPomo:
            pomodoro.setStart(time, stateEnum.breakrunning)
            intervalID = setTimeout(updateDisplay, secondToMinutes.min5 * 1000)
            stopVibrate = setTimeout(stopVibratefn, (secondToMinutes.min5* 1000) + 10000)
            break;
        case stateEnum.breakrunning:
            clockBackground.style.fill = "#66bb55";
            timerLabel.text = minuteSecondFormat(0)
            timeArc.sweepAngle = 0
            clearTimeout(intervalID);
            clearTimeout(stopVibrate)
            pomodoro.state = stateEnum.idle
            break;
        case stateEnum.endBreak:
            clearTimeout(intervalID);
            clearTimeout(stopVibrate)
            timerLabel.text = minuteSecondFormat(secondToMinutes.min25)
            timeArc.sweepAngle = 0
            pomodoro.state = stateEnum.idle;
            clockBackground.style.fill = "#00bfff"
            break
    }
}


clock.addEventListener("tick", handleClock);
playButton.addEventListener("activate", pomodoroBtn)