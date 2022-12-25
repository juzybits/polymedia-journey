import React, { useEffect } from 'react';

import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';

import '../css/Doors.less';

export function Doors(props: any) {

    useEffect(() => {
        document.body.className = 'bg-bricks';
    }, []);

    return <div id='page'>
        <div id='door-grid'>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
            <div className='door-wrapper'><img src={imgDoorClosed} alt='closed door' /></div>
        </div>
    </div>;
}
