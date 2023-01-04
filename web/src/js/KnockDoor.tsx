import React, { useEffect, useState } from 'react';

import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';
import imgTorch from '../img/torch.gif';

import '../css/KnockDoor.less';

export function KnockDoor(props: any) {

    useEffect(() => {
        document.body.className = 'bg-bricks';
    }, []);

    const imgSrc = imgDoorClosed; // imgDoorOpen
    const [act, setAct] = useState('1_intro');

    const ModalIntro = (props: any) => {
        return <div className='modal'>
            <div className='intro'>
                <h1 className='mario title'>TWO</h1>
                <p className='paragraph'>You found the door to the invisible... but it is closed.</p>
                <p className='paragraph'>Can you find a way to open the door?</p>
                <button className='btn' onClick={() => setAct('2_game')}>I'm ready</button>
            </div>
        </div>;
    };

    const onClickDoor = () => {
        console.log("Knocking"); // TODO Remove
    };

    return <div id='page'>
        { act=='1_intro' && <ModalIntro /> }
        <div id='door-container'>
            <div className='torch-wrap'>
                <img className='torch left' src={imgTorch} alt='torch' />
            </div>
            <div className='door-wrap'>
                <img className='door hand' src={imgSrc} alt='door' onClick={onClickDoor} />
            </div>
            <div className='torch-wrap'>
                <img className='torch right' src={imgTorch} alt='torch' />
            </div>
        </div>
    </div>;
}
