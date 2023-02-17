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
        "Still here?",
        "I said no visitors!",
        "Please go away.",
        "You are wasting your time.",
        "...",
        "Stop!",
        "I'm never going to open this door.",
        "Has anyone ever told you how annoying you are?",
        "Begone!!!",
        "You are NOT coming in. Accept it.",
        "Go. Away. You don't belong here!",
        "Look kid, you just don't have what it takes.",
        "Go home!",
        "Let me be perfectly clear: you are simply unfit to come in. Unworthy.",
        "I am never opening this door for you.",
        "Never!",
        "Not in a million years!",
        "😤",
        "😤😡",
        "😤😡🌋",
        "GRRR. OK, OK! I'LL OPEN THE DOOR! You're really tenacious... Come in!",
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
            <p className='paragraph narrator fade-in-2'>
                The door to The Invisible, you've come so far!
                Your second challenge, your journey's next part.
            </p>
            <p className='paragraph narrator fade-in-3'>
                The entrance is blocked, it won't budge or yield.
                Demonstrate your tenacity, and let the journey reveal.
            </p>
            <button className='btn fade-in-4 last' onClick={() => setAct('1_game')}>I'm ready</button>
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
