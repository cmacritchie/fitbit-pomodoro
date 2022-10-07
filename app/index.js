import clock from "clock";
import * as document from "document";
import { Pomodoro, stateEnum } from "./pomodoro.js";
import { dateToSeconds, minuteSecondFormat, secondToMinutes } from './utils'

//tick every second
clock.granularity = "seconds";


let timeArc = document.getElementById("timeArc");
let playButton = document.getElementById("play-button");
let timerLabel = document.getElementById("timer-label")
let clockBackground = document.getElementById("clockBackground");

//instantiate pomodoro
let pomodoro = new Pomodoro()


function secondsToAngle(seconds, reqTime) {
    return (360 / reqTime) * seconds;
  }

function handleClock(evt) {
    pomodoro.updateTime(dateToSeconds(evt.date))

    if(pomodoro.state === stateEnum.running) {
        // console.log(Object.keys(evt.date))
        // pomodoro.updateTime(dateToSeconds(evt.date))
        // console.log(pomodoro.elapsedTime())
        // const time = pomodoro.elapsedTime()
        // const toad = minuteSecondFormat(time)
        // console.log(toad)
        // const passedTime = 
        timerLabel.text = minuteSecondFormat(secondToMinutes.min1 - pomodoro.elapsedTime())
        timeArc.sweepAngle = secondsToAngle(pomodoro.elapsedTime(), secondToMinutes.min1)
    }

    if(pomodoro.state === stateEnum.endPomo) {
        timerLabel.text = minuteSecondFormat(0)
        timeArc.sweepAngle = 360
        if(pomodoro.elapsedTime() % 2) {
            clockBackground.style.fill = "#ffff00"; // Replace "#ffffff" with your color
        }
        else {
            clockBackground.style.fill = "#ffffff";
        }
    }

    if(pomodoro.state === stateEnum.breakrunning) {
        clockBackground.style.fill = "#66bb55";
        timerLabel.text = minuteSecondFormat(secondToMinutes.min1)
        timeArc.sweepAngle = secondsToAngle(pomodoro.elapsedTime(), secondToMinutes.min5)
        timerLabel.text = minuteSecondFormat(secondToMinutes.min1 - pomodoro.elapsedTime())
    }


    // let today = new Date();
    // let secs = today.getSeconds()
    
    
}


function startPomodoro(evt) {
// console.log(clock.getDate())
    const time = dateToSeconds(Date.now())
    // console.log("TMEI", clock.dateToSeconds())
    // pomodoro.setStart(time)
    console.log("CLICKED", pomodoro.state)
    switch(pomodoro.state) {
        case stateEnum.endBreak:
            pomodoro.setStart(time, stateEnum.running)
            break;
        case stateEnum.running:
            console.log("running")
            this.state = stateEnum.endBreak
            break;
        case stateEnum.endPomo:
            pomodoro.setStart(time, stateEnum.breakrunning)    
    }
}


clock.addEventListener("tick", handleClock);
playButton.addEventListener("activate", startPomodoro)