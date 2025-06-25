import React, {useEffect, useState} from 'react';

import './Timer.css'

const TimerWidget = () => {

    const [time, setTime] = useState(1500);
    const [intervalId, setIntervalId] = useState(null);

    const decrement = ()=> setTime(time => time -1);

    const startTimer = ()=> {
        if(intervalId === null) {
            const id = setInterval(decrement, 1000);
            setIntervalId(id);
            clearInterval();
        } 
        console.log(time); 
    }   

    const formatTime = ()=> {
        setTime(prevTime => Math.floor(time / 60))
    }



    return (
    <div className="pomodoro-widget">
        <h2>Pomodoro Timer</h2>
        <p className="status">Focus time</p>
        <div className="timer-display">25:00</div>
         <div className="controls">
          <button onClick={()=>startTimer(intervalId)} className="start-btn">Start</button>
          <button className="pause-btn">Pause</button>
          <button className="reset-btn">Reset</button>
         </div>
    </div>
    )
}

export default TimerWidget;