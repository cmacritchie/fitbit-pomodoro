import { secondToMinutes } from './utils'
export const stateEnum = {
    running:'RUNNING',
    paused: 'PAUSED',
    idle: 'IDLE',
}

const runningSession = {
    goTime:'GOTIME',
    break: 'BREAK'
}

const secondToMinutes = {
    min25: 1500,
    min5: 300
}

// const timerConstants = {
//     business:
// }

export function Pomodoro () {

    
       
        this.state =  stateEnum.idle
        this.startTime = null
        this.currentTime = null
        // this.fractionComplete = this.startTime
        this.elapsedTime = () =>  {
            // console.log(`current ${this.currentTime}, start ${this.startTime}`)
            return this.currentTime - this.startTime
        }
        // this.endTime = null
      

    // this.reset = () => {

    this.setStart = (time) => {
        // console.log("Set Start", time)
        this.state = stateEnum.running
        this.startTime = time
        this.endTime = time + secondToMinutes.min25

    }

    this.updateTime = (time) => {
        this.currentTime = time
    }

    // cancel()

}