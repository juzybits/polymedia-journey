import React, { useEffect } from 'react';

import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';
import imgTorch from '../img/torch.gif';

import '../css/KnockDoor.less';

export function KnockDoor(props: any) {

    useEffect(() => {
        document.body.className = 'bg-bricks';
    }, []);

    const imgSrc = imgDoorClosed; // imgDoorOpen


    return <div id='page'>
        <div id='door-container'>
            <div className='torch-wrap'>
                <img className='torch left' src={imgTorch} alt='torch' />
            </div>
            <div className='door-wrap'>
                <img className='door' src={imgSrc} alt='door' />
            </div>
            <div className='torch-wrap'>
                <img className='torch right' src={imgTorch} alt='torch' />
            </div>
        </div>
    </div>;
}
