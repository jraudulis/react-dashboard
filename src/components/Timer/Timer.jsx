import React, {useEffect, useState} from 'react';

import './Timer.css'

const TimerWidget = () => {

    const [time, setTime] = useState(1500);
    const [intervalId, setIntervalId] = useState(null);

    const decrement = ()=> setTime(time => time -1);

    const startTimer = ()=> {
        if(intervalId === null) {
            const id = setInterval(()=> decrement(), 1000);
            setIntervalId(id);
        }  
    }
    
    const pauseTimer = ()=> {
     if(intervalId) {
         clearInterval(intervalId);
         setIntervalId(null);
        }
    }

    const resetTimer = ()=> {
        clearInterval(intervalId);
        setIntervalId(null);
        setTime(1500);
    }

    const formatTime = (time)=> {
        const mins = Math.floor(time / 60).toString().padStart(2, '0');
        const secs = (time % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }



    return (
    <div className="widget pomodoro-widget">
        <h2>Pomodoro Timer</h2>
        <p className="status">Focus time</p>
        <div className="timer-display">{formatTime(time)}</div>
         <div className="controls">
          <button onClick={startTimer} className="start-btn">Start</button>
          <button onClick={pauseTimer} className="pause-btn">Pause</button>
          <button onClick={resetTimer} className="reset-btn">Reset</button>
         </div>
    </div>
    )
}

export default TimerWidget;