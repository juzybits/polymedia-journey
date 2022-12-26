import React, { useEffect } from 'react';

import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';
import imgTorch from '../img/torch.gif';

import '../css/KnockDoor.less';

export function KnockDoor(props: any) {

    useEffect(() => {
        document.body.className = 'bg-bricks';
    }, []);

    return <div id='page'>
        <div id='door-container'>
            <img className='torch left' src={imgTorch} alt='closed door' />
            {/*<img id='door' src={imgDoorClosed} alt='closed door' />*/}
            <img id='door' src={imgDoorOpen} alt='closed door' />
            <img className='torch right' src={imgTorch} alt='closed door' />
            <div className='mario'>
                <span className='red'>WRONG!</span>
            <br/>
                <span className='green'>CORRECT!</span>
            <br/>
            </div>
        </div>
    </div>;
}
