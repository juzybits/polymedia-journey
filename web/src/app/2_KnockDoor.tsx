import { useEffect, useState } from 'react';

import imgDoorClosed from '../img/door_closed.webp';
import imgDoorOpen from '../img/door_open.webp';
import imgTorch from '../img/torch.gif';

import './2_KnockDoor.less';

export function KnockDoor(props: any) {

    useEffect(() => {
        document.body.className = 'bg-bricks';
    }, []);

    const [act, setAct] = useState('0_intro');
    const [msgIdx, setMsgIdx] = useState(0);
    const messages = [
        '',
        "Sorry, no visitors allowed.",
        "No visitors, bye!",
        "I said no visitors!",
        "Still here?",
        "Go away.",
        "You're quite annoying...",
        "Get. Lost.",
        "You are wasting your time.",
        "I'm trying to work here!",
        "...",
        "Stop!!!",
        "I'm never going to open this door.",
        "Has anyone ever told you how annoying you are?",
        "You are NOT coming in. Accept it.",
        "Go away! You don't belong here.",
        "Look kid, you just don't have what it takes.",
        "Go home!",
        "Let me be perfectly clear: you are simply unfit to come in. Unworthy.",
        "I am never opening this door for you.",
        "Ever.",
        "Ever!",
        "EVER!",
        "EVER!! 😠",
        "EVER!!! 😡",
        "EVER!!!! 🌋",
        "GRRR. OK, OK, I'LL OPEN THE DOOR! You're really tenacious... Come in!",
        '',
    ];

    useEffect(() => {
        if (msgIdx == messages.length-1) {
            setAct('3_open_door');
        }
    }, [msgIdx]);

    const Intro = () => {
        return <div className='intro'>
            <h1 className='mario title fade-in-1'>TWO</h1>
            <p className='paragraph fade-in-2'>You found the door to the invisible... but it's closed.
                <br/><br/>Do you have what it takes to open the door?
                <br/><br/>Demonstrate your tenacity.
            </p>
            <button className='btn fade-in-3' onClick={() => setAct('1_game')}>I'm ready</button>
        </div>;
    };

    const onClickNextPhase = () => { props.nextStage(); };
    const onClickNextMessage = () => { setMsgIdx(oldIdx => oldIdx+1); };
    const DoorContainer = () => {
        return <>
            <div id='door-container'>
                <div className='torch-wrap'>
                    <img className='torch left' src={imgTorch} alt='torch' />
                </div>
                <div className='door-wrap'>
                    <img className='door hand' src={imgSrc} alt='door' onClick={act=='3_open_door' ? onClickNextPhase : onClickNextMessage} />
                </div>
                <div className='torch-wrap'>
                    <img className='torch right' src={imgTorch} alt='torch' />
                </div>
            </div>
            { messages[msgIdx] && <div className='speech-bubble'>{messages[msgIdx]}</div> }
        </>;
    };

    let contents = <></>;
    if (act=='0_intro') {
        contents = <Intro />;
    } else {
        contents = <DoorContainer />;
    }

    let imgSrc = act == '3_open_door' ? imgDoorOpen : imgDoorClosed; // imgDoorOpen
    return <div id='page' className='knock-door'>
        {contents}
    </div>;
}
