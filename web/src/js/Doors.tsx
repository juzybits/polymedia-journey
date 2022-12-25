import React, { useEffect, useState } from 'react';

import imgDoorClosedDiff from '../img/door_closed_diff.webp';
import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';

import '../css/Doors.less';

export function Doors(props: any) {

    useEffect(() => {
        document.body.className = 'bg-bricks';
    }, []);

    const [modal, setModal] = useState(<></>);

    const modalWrong = () => {
        alert('Wrong!');
    }

    const modalCorrect = () => {
        alert('Correct!');
    }

    return <div id='page' className='doors'>
        <div className='door-grid'>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosedDiff} onClick={modalCorrect} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
            <div className='door-wrap'><img className='hand' src={imgDoorClosed} onClick={modalWrong} alt='closed door' /></div>
        </div>
    </div>;
}
