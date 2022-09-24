import clock from "clock";
import * as document from "document";
import { Pomodoro, stateEnum } from "./pomodoro.js";
import { dateToSeconds, minuteSecondFormat, secondToMinutes } from './utils'

//tick every second
clock.granularity = "seconds";


let timeArc = document.getElementById("timeArc");
let playButton = document.getElementById("play-button");
let timerLabel = document.getElementById("timer-label")

//instantiate pomodoro
let pomodoro = new Pomodoro()


function secondsToAngle(seconds) {
    return (360 / secondToMinutes.min25) * seconds;
  }

function handleClock(evt) {


    if(pomodoro.state === stateEnum.running) {
        // console.log(Object.keys(evt.date))
        pomodoro.updateTime(dateToSeconds(evt.date))
        // console.log(pomodoro.elapsedTime())
        // const time = pomodoro.elapsedTime()
        // const toad = minuteSecondFormat(time)
        // console.log(toad)
        // const passedTime = 
        timerLabel.text = minuteSecondFormat(secondToMinutes.min25 - pomodoro.elapsedTime())
        timeArc.sweepAngle = secondsToAngle(pomodoro.elapsedTime())
    }

    // let today = new Date();
    // let secs = today.getSeconds()
    
    // timeArc.sweepAngle = secondsToAngle(secs)
    
}


function startPomodoro(evt) {
// console.log(clock.getDate())
    const time = dateToSeconds(Date.now())
    // console.log("TMEI", clock.dateToSeconds())
    pomodoro.setStart(time)
}


clock.addEventListener("tick", handleClock);
playButton.addEventListener("activate", startPomodoro)