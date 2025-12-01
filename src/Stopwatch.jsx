import React, {useState, useEffect, useRef} from 'react';


function Stopwatch() {

    const [erasedTime, setErasedTime] = useState(0);
    const timeStart = useRef(0);
    const [isRun, setIsRun] = useState(false);
    const idRef = useRef(null);

    useEffect(() => {
        if (isRun) {
            idRef.current = setInterval(() => {
                setErasedTime(Date.now() - timeStart.current);
                console.log(`Date: ${Date.now() - timeStart.current}`);
                console.log(`current: ${timeStart.current}`)
            }, 10);
            
        } 
        return () => clearInterval(idRef.current);

    }, [isRun])

    function startPause() {
        if (!isRun) {
            timeStart.current = Date.now() - erasedTime;
        }
        console.log(`Time start cuurrent: ${timeStart.current}`);
        console.log(`Date in button: ${Date.now() - erasedTime}`);
        setIsRun(!isRun);
    }

    function reset() {
        setIsRun(false);
        setErasedTime(0);
    }

    function timeDisplay() {
        const seconds = Math.floor(erasedTime / 1000) % 60;
        const minutes = Math.floor(erasedTime / 1000 / 60) % 60;
        const hours = Math.floor(erasedTime / 1000 / 60 / 60) % 24;
        const days = Math.floor(erasedTime / 1000 / 60 / 60);

        
        
        return `${addZero(days)}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    }

    function addZero(num) {
        return (num >= 10) ? num : `0${num}`;
    }

    function changeText() {
        if (isRun) {
            return "Stop ";
        } else {
            return "Start";
        }
    }


    return (
        <div className="container">
            <p>Online Timer & Stopwatch</p>
            <span className="time-display">{timeDisplay()}</span>
            <div className="buttons">
                <button className="startPause" onClick={startPause}>{changeText()}</button>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default Stopwatch;