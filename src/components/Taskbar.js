import { useState, useEffect } from 'react';
import { IoBatteryHalf } from "react-icons/io5";
import { FaGithub, FaBluetoothB } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
const Taskbar = () => {
    const [time, setTime] = useState(getCurrentTime());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    function getCurrentTime() {
        const date = new Date();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const meridiem = date.getHours() >= 12 ? 'PM' : 'AM';
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return {
            hours,
            minutes: padZero(minutes),
            meridiem,
            formattedDate,
        };
    }
    function padZero(number) {
        return number < 10 ? '0' + number : number;
    }

    return (
        <div id='taskbar'>
            <div id='tb-left'>
                <a href='https://github.com/Pratyush-Nirwan/EncryptDecrypt' target='_blank' id='github-link'>
                    <FaGithub />
                    <h5>github.com/Pratyush-Nirwan</h5>
                </a>
            </div>
            <div id='tb-right'>
                <div className='tb-grp'>
                    <FaBluetoothB />
                    <FaWifi />
                </div>
                <div className='tb-grp'>
                    <h5>52%</h5>
                    <IoBatteryHalf id='battery' />
                </div>
                <div className='tb-grp'>
                    <h5 id='date'>{time.formattedDate}</h5>
                    <h5 id='time'>
                        {time.hours}:{time.minutes} {time.meridiem}
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default Taskbar;