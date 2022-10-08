import { secondToMinutes } from './utils'
import { vibration } from "haptics";
export const stateEnum = {
    running:'RUNNING',
    endPomo:'ENDPOMO',
    breakrunning: 'BREAKRUNNING',
    endBreak: 'ENDBREAK',
    paused: 'PAUSED',
    idle: 'IDLE',
}

const runningSession = {
    goTime:'GOTIME',
    break: 'BREAK'
}


// const timerConstants = {
//     business:
// }

export function Pomodoro () {
       
        this.state =  stateEnum.idle
        this.startTime = null
        this.currentTime = null
        this.ringTime = 0
        this.elapsedTime = () =>  {
            // console.log(`current ${this.currentTime}, start ${this.startTime}`)
            return this.currentTime - this.startTime
        }
        // this.endTime = null
      

    // this.reset = () => {

    this.setStart = (time, newState) => {
        // console.log("Set Start", time)
        this.state = newState
        this.startTime = time
        this.endTime = time + secondToMinutes.min1

    }

    //pt vibrate in here
    this.updateTime = (time) => {
        this.currentTime = time
        switch(this.state) {
            case stateEnum.running:
                if(this.elapsedTime() >= secondToMinutes.min1) {
                    this.state = stateEnum.endPomo
                    this.currentTime = this.startTime //stay at zero
                } 
                break;
            case stateEnum.endPomo:
                break;
            case stateEnum.breakrunning:
                if(this.elapsedTime() >= secondToMinutes.min1) {
                    this.state = stateEnum.endBreak
                    this.currentTime = this.startTime //stay at zero
                } 
                break;
            case stateEnum.endBreak:
                break;
            default:
                break;
        }
             
    }

    // cancel()

}